<?php

namespace Matrix\Categories\Http;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Matrix\Categories\Http\Traits\UseCategory;
use ReactorCMS\Http\Controllers\ReactorController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Hierarchy\Node;
use Reactor\Hierarchy\NodeSource;
use Reactor\Hierarchy\NodeType;
use Maatwebsite\Excel\Facades\Excel;

class CategoriesController extends ReactorController
{

    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;
    use UseCategory;

    public $nodeType = 'categories';

    public function __construct()
    {
        // constructor body
    }

    public function index($id = null)
    {

        $nodes = $this->getCategories($id, 'DESC')->paginate(25);

        return view('Categories::index', compact('nodes', 'id'));
    }

    public function Create($id = null)
    {

        $type = get_node_type($this->nodeType);

        $data['parent'] = !is_null($id) ? Node::findOrFail($id) : null;

        $form = $this->getCreateForm($id, $data['parent']);
        $form->setUrl(route('reactor.category.create', $id));

        $form->modify('type', 'hidden', [
            'value' => $type->getKey(),

        ]);

        $data['form'] = $form;

        return $this->compileView('Categories::create', $data, 'Create');
    }

    public function store(Request $request, $id = null)
    {

        //$this->authorize('EDIT_NODES');

        $this->validateCreateForm($request);

        //dd($request->all());

        list($node, $locale) = $this->createNode($request, $id);

        $this->notify('Category Created');

        return redirect()->route('reactor.category.edit', [
            $node->getKey(),
            $node->translate($locale)->getKey(),
        ]);

    }

    public function edit($id, $source = null)
    {

        list($node, $locale, $source) = $this->authorizeAndFindNode($id, $source);

        $form = $this->getEditForm($id, $node, $source);
        $form->setUrl(route('reactor.category.edit', [$id, $source->getKey()]));

        $files = File::allFiles(public_path('assets/icons/'));
        foreach ($files as $path) {
            $iconfiles[pathinfo($path)['basename']] = pathinfo($path)['basename'];
        }
        $icons = $iconfiles;

        $form->modify('category_icon', 'select', [

            'choices' => [$icons],
            'empty_value' => '-Select-',

        ]);

        $form->modify('meta_image', 'hidden', [
        ]);

        $form->modify('meta_author', 'hidden', [
        ]);

        return view('Categories::edit', compact('form', 'node', 'locale', 'source', 'id'));

    }

    public function update(Request $request, $id, $source)
    {

        $node = $this->authorizeAndFindNode($id, $source, 'EDIT_NODES', false);

        if ($response = $this->validateNodeIsNotLocked($node)) {
            return $response;
        }

        list($locale, $source) = $this->determineLocaleAndSource($source, $node);

        $this->validateEditForm($request, $node, $source);

        $this->determinePublish($request, $node);

        // Recording paused for this, otherwise two records are registered
        chronicle()->pauseRecording();
        $node->update([
            $locale => $request->all(),
        ]);
        // and resume
        chronicle()->resumeRecording();

        $this->notify('Category Updated');

        return redirect()->back();
    }

    public function createTranslation($id)
    {
        list($node, $locale, $source) = $this->authorizeAndFindNode($id, null, 'EDIT_NODES');

        if (count($locales = $this->getAvailableLocales($node)) === 0) {
            flash()->error(trans('general.no_available_locales'));

            return redirect()->back();
        }

        $form = $this->getCreateTranslationForm($id, $locales);
        $form->setUrl(route('reactor.location.translation.store', $id));

        return $this->compileView('Categories::translate', compact('form', 'node', 'locale', 'source'), 'Category Translation');
    }

    public function storeTranslation(Request $request, $id)
    {
        $this->authorize('EDIT_NODES');

        $node = Node::findOrFail($id);

        if ($response = $this->validateNodeIsNotLocked($node)) {
            return $response;
        }

        $this->validateCreateTranslationForm($request);

        $locale = $this->validateLocale($request);

        // Recording paused for this, otherwise two records are registered
        chronicle()->pauseRecording();
        $node->update([
            $locale => $request->all(),
        ]);
        // and resume
        chronicle()->resumeRecording();

        $this->notify('general.added_translation', 'created_node_translation', $node);

        return redirect()->route('reactor.category.edit', [
            $node->getKey(),
            $node->translate($locale)->getKey(),
        ]);
    }

    /**
     * Deletes a translation
     *
     * @param int $id
     * @return Response
     */
    public function destroyTranslation($id)
    {
        $this->authorize('EDIT_NODES');

        $source = NodeSource::findOrFail($id);

        $node = $source->node;

        if ($response = $this->validateNodeIsNotLocked($node)) {
            return $response;
        }

        // Prevent deletion if there is only one translation
        if (count($node->translations) > 1) {
            $source->delete();
        }

        $node->load('translations');

        $this->notify('general.destroyed_translation', 'deleted_node_translation', $node);

        return redirect()->route('reactor.category.edit', [$node->getKey(), $node->translateOrfirst()->getKey()]);
    }

    public function getCategory($parent_id)
    {


        $nodetype = get_node_type($this->nodeType);

        $categories = $nodetype->nodes()->where('parent_id', $parent_id)->translatedIn(locale())->get();

        $num_rows = count($categories);

        if ($num_rows > 0) {
            $select = "<option value=''>--Select--</option>";
            $tt = "<select  class='cat form-control' name='category[]'";
            $tt .= "<option value=''>$select</option>";
            foreach ($categories as $cat) {
                $id = $cat->getKey();
                $title = $cat->getTitle();
                $tt .= "<option value='$id'>$title</option>";
            }
            $tt .= "</select>
           ";

            echo $tt;
            exit();
        }

    }

    public function hasCategory($id){

        $category = Node::withType('categories')->where('parent_id', $id)->translatedIn(locale())->first();

        if ($category) {

            return "has_child";
        } else {

            return "not_found";
        }

    }

    public function popular()
    {

        $locaitons = Node::WhereExtensionAttribute($this->nodeType, 'popular', 1)
            ->translatedIn(locale())
            ->take(16)
            ->get();

        foreach ($locaitons as $node) {

            $data[] = [
                'id' => $node->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
            ];
        }

        return $data;
    }

    public function getCategoriesList($parent_id = NULL)
    {
        # code...
        $nodetype = get_node_type($this->nodeType);
        $categories = $nodetype->nodes()->where('parent_id', NULL)->get();
        //dd($categories);

        $data = [];
        foreach ($categories as $category) {
            $data[] = [
                'title' => $category->getTitle(),
                'slug' => $category->getName(),
            ];
        }

        return $data;

    }

    public function import($id = null)
    {
        if ($id) {
            $node = Node::find($id);
            $parent = $node->getTitle();
        } else {

            $parent = 'Parent';
        }

        return view('Categories::import', compact('id', 'parent'));
    }

    public function import_store($id = null, Request $request)
    {

        $file = trim($request->file('file'));

        Excel::load($file, function ($reader) use ($request, $id) {
            $results = $reader->get();

            if (count($results) > 501) {

                return redirect()->back()->with('message', 'Not allowed more than 500 data');
            }

            $isValid = false;

            $isFailed = [];
            foreach ($results as $row1) {

                if (trim($row1['title']) != null) {
                    $isValid = $this->check_category($request, $id, $row1);
                } else {
                    $isFailed[] = $row1;
                }
            }

            if ($isValid == true) {

                $msz = "Imported Successfully, " . count($isFailed) . " Rejected";
                return redirect()->back()->with('message', $msz);
            } else {

                if (count($isFailed) > 0) {
                    $msz = count($isFailed) . " Rejected";
                } else {

                    $msz = "Already Exist!";

                }
                return redirect()->back()->with('message', $msz);
            }

        });

        return redirect()->back();

    }

    private function check_category($request, $parent = 0, $str)
    {

        $nodeType = get_node_type('categories');
        $type = $nodeType->getKey();

        if ($str != '') {

            $request->request->set('title', trim($str['title']));
            $request->request->set('node_name', trim(str_slug($str['title'])));
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);
            //$request->request->set('popular', trim($str['popular']));
            $request->request->set('meta_title', trim($str['meta_title']));
            $request->request->set('meta_keywords', trim($str['meta_keywords']));
            $request->request->set('meta_description', trim($str['meta_description']));

            $chk_location = Node::where('parent_id', $parent)->withName(trim(str_slug($str['title'])))->first();

            if (!$chk_location) {

                $this->validateCreateForm($request);

                list($node, $locale) = $this->createNode($request, $parent);

                return true;

            } else {

                $node_id = $chk_location->getKey();
                $source = $chk_location->translate('en')->getKey();
                list($node, $locale, $source) = $this->authorizeAndFindNode($node_id, $source);

                //--Update Node
                $node->update([
                    $locale => array_except($request->all(), ['_token', '_method']),
                ]);

                return true;
            }
        }
    }

}
