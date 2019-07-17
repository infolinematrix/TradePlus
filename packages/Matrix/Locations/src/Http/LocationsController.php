<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 7/7/17
 * Time: 6:05 PM
 */

namespace Matrix\Locations\Http;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;
use ReactorCMS\Http\Controllers\ReactorController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Hierarchy\Node;
use Reactor\Hierarchy\NodeSource;
use Reactor\Hierarchy\NodeType;

class LocationsController extends ReactorController
{

    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;

    public $nodeType = 'locations';

    public function __construct()
    {
        // constructor body
    }

    public function index($id = null)
    {

        $nodes = Node::withType('locations')->where('parent_id', $id)->translatedIn(locale());
        $nodes = $nodes->translatedIn(locale())->paginate();

        return view('Locations::index', compact('nodes', 'id'));
    }

    public function Create($id = null)
    {

        $type = get_node_type($this->nodeType);

        $data['parent'] = !is_null($id) ? Node::findOrFail($id) : null;

        $form = $this->getCreateForm($id, $data['parent']);
        $form->setUrl(route('reactor.location.create', $id));

        $form->modify('type', 'select', [
            'choices' => $this->compileAllowedNodeTypes($data['parent']),
            'selected' => $type->getKey(),
            'attr' => ['readonly'],
        ]);

        $data['form'] = $form;

        return $this->compileView('Locations::create', $data, 'Create');
    }

    public function Store(Request $request, $id = null)
    {

        $this->authorize('EDIT_NODES');

        $this->validateCreateForm($request);

        list($node, $locale) = $this->createNode($request, $id);

        //--Make node Published by default
        $this->changeNodeStatus($node->getKey(), 'Publish', 'null');

        $this->notify('Location Created');

        return redirect()->route('reactor.location.edit', [
            $node->getKey(),
            $node->translate($locale)->getKey(),
        ]);

    }

    public function edit($id, $source = null)
    {

        list($node, $locale, $source) = $this->authorizeAndFindNode($id, $source);

        $form = $this->getEditForm($id, $node, $source);



        $form->setUrl(route('reactor.location.edit', [$id, $source->getKey()]));

        return view('Locations::edit', compact('form', 'node', 'locale', 'source', 'id'));
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

        $this->notify('Location Updated');

        return redirect()->back()->with('message', 'Successful!');
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

        return $this->compileView('Locations::translate', compact('form', 'node', 'locale', 'source'), 'Location Translation');
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

        return redirect()->route('reactor.location.edit', [
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

        return redirect()->route('reactor.location.edit', [$node->getKey(), $node->translateOrfirst()->getKey()]);
    }

    public function getLocation($parent_id)
    {

        $nodetype = get_node_type($this->nodeType);

        $locaitons = $nodetype->nodes()->where('parent_id', $parent_id)->translatedIn(locale())->get();

        $num_rows = count($locaitons);

        if ($num_rows > 0) {
            $tt = "<select  class='loc form-control' name='locations[]' id='location'>";
            $tt .= "<option value=''>--Select--</option>";
            foreach ($locaitons as $loc) {

                $title = $loc->getTitle();
                $id = $loc->getKey();
                $tt .= "<option value='$id'>$title</option>";
            }
            $tt .= "</select>
           ";

            echo $tt;
            exit();
        }
    }

    public function searchLocation()
    {

        $term = $_GET["q"];
        $cid = Node::withType('locations')->search($term, 20, true)->get();

        if (count($cid) != 0) {
            foreach ($cid as $row) {
                $answer[] = array("id" => $row->getKey(), "text" => $row->getTitle());
            }
        } else {
            // 0 results send a message back to say so.
            $answer[] = array("id" => "0", "text" => __("No Results Found.."));
        }

        echo json_encode($answer); //format the array into json data
    }

    public function hasLocation($id){

        $location = Node::withType('locations')->where('parent_id', $id)->translatedIn(locale())->first();

        if ($location) {

            return "has_child";
        } else {

            return "not_found";
        }

    }


    public function import($id = null)
    {
        if ($id) {
            $node = Node::find($id);
            $parent = $node->getTitle();
        } else {

            $parent = 'Parent';
        }

        return view('Locations::import', compact('id', 'parent'));
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

                    $isValid = $this->check_location($request, $id, $row1);

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

    private function check_location($request, $parent = 0, $str)
    {

        $nodeType = get_node_type('locations');
        $type = $nodeType->getKey();

        if ($str != '') {

            $request->request->set('title', trim($str['title']));
            $request->request->set('node_name', trim(str_slug($str['title'])));
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);
            $request->request->set('popular', trim($str['popular']));
            $request->request->set('meta_title', trim($str['meta_title']));
            $request->request->set('meta_keywords', trim($str['meta_keywords']));
            $request->request->set('meta_description', trim($str['meta_description']));
            $request->request->set('lat', trim($str['latitude']));
            $request->request->set('long', trim($str['longitude']));

            $chk_location = Node::where('parent_id', $parent)->withName(trim($str['slug']))->first();

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
}
