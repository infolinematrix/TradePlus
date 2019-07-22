<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 2/5/18
 * Time: 2:01 PM
 */

namespace extension\Site\Http\Backend;

use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use ReactorCMS\Entities\Node;
use ReactorCMS\Http\Controllers\ReactorController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Documents\Media\Media;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image as ImageFacade;
use Illuminate\Support\Facades\Auth;
class ServiceController extends ReactorController
{
    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;

    public function __construct()
    {

    }

    public function index($node_id)
    {

        $node = Node::find($node_id);

        $nodes = $node->children()->withType('servicetype')->paginate();

        return view('Site::backend.service.index', compact('node_id', 'nodes'));
    }

    public function create($node_id)
    {

        $type = get_node_type('servicetype');

        $form = $this->getCreateForm(null, null);
        $form->setUrl(route('reactor.business.service.create', $node_id));

        $form->modify('type', 'hidden', [
            'value' => $type->getKey(),

        ]);

        $categories = Node::withType('categories')->where('parent_id', null)->get();

        return view('Site::backend.service.create', compact('node_id', 'form','categories'));
    }

    public function store(Request $request)
    {

        $this->validateCreateForm($request);


        list($node, $locale) = $this->createNode($request, $request->node_id);

        /*Meta*/
        $categories = $request->input('categories');
        $cat = '';
        foreach ($categories as $key => $value) {

            $cat .= $value . ',';
        }
        $category = rtrim($cat, ',');

        //save meta
        $node->setmeta('categories', $category);
        $node->save();


        $this->notify('nodes.created');

        return redirect()->route('reactor.business.service.edit', [
            $node->getKey(),
            $node->translate($locale)->getKey(),
        ]);
    }

    public function edit($node_id, $source)
    {

        list($node, $locale, $source) = $this->authorizeAndFindNode($node_id, $source);

        $form = $this->getEditForm($node_id, $node, $source);
        $form->setUrl(route('reactor.business.service.edit', [$node_id, $source->getKey()]));
        $form->setFormOptions(['files' => true]);

        /*Category Meta*/
        $categories = Node::withType('categories')->where('parent_id', null)->get();
        $category_meta = $node->metas()->where('key', 'categories')->first();
        if ($category_meta) {
            $metas = explode(',', $category_meta->value);
            $cat = '';
            foreach ($metas as $key => $value) {

                $catt = Node::findOrFail($value);
                if ($catt->parent_id == null) {

                    $cat .= $catt->getKey();
                }

            }
            $category_meta = $cat;
        }

        /*image*/
        $cover = $node->getImages()->where('img_type', 'cover')->first();

        return view('Site::backend.service.edit', compact('node', 'form', 'categories', 'category_meta', 'cover'));

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

        $node->update([
            $locale => $request->all(),
        ]);

        /*Meta*/
        $categories = $request->input('categories');
        $cat = '';
        foreach ($categories as $key => $value) {

            $cat .= $value . ',';
        }
        $category = rtrim($cat, ',');

        //save meta
        $node->setmeta('categories', $category);
        $node->save();


        $coverimage = $request->file('cover');

        if ($coverimage) {

            $name = str_random(6);
            $ext = $coverimage->extension();

            $destinationPath = public_path('/uploads');

            $coverimage->move($destinationPath, $name . '.' . $ext);
            ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(850, 300)->save()->save();

            $cover = $node->getImages()->where('img_type', 'cover')->first();

            if ($cover) {
                File::delete(upload_path($cover->path));
                Media::where('node_id', $node->getKey())->where('img_type', 'cover')->delete();
            }

            //-- Save Image in Database--//
            $media = new Media();
            $media->node_id = $node->getKey();
            $media->path = $name . '.' . $ext;
            $media->name = $name;
            $media->extension = $ext;
            $media->mimetype = $coverimage->getClientMimeType();
            $media->img_type = 'cover';
            $media->size = 0;
            $media->user_id = Auth::user()->id;
            $media->save();
        }

        $this->notify('nodes.edited', 'updated_node_content', $node);

        return redirect()->back();
    }


    public function import($node_id){

        $categories = Node::withType('categories')->where('parent_id', null)->get();

        return view('Site::backend.service.import', compact('node_id','categories'));

    }

    public function import_store($id = null, Request $request)
    {


        $file = trim($request->file('file'));

        Excel::load($file, function ($reader) use ($request, $id) {
            $results = $reader->get();

            if (count($results) > 500) {

                return redirect()->back()->with('message', 'Not allowed more than 500 data');
            }

            $isValid = false;

            $isFailed = [];

            foreach ($results as $row1) {




                if (trim($row1['title']) != null) {

                    $isValid = $this->check_service($request, $id, $row1);

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

    private function check_service($request, $parent = 0, $str)
    {

        $categories = $request->categories;

        $nodeType = get_node_type('servicetype');
        $type = $nodeType->getKey();

        if ($str != '') {

            $request->request->set('title', trim($str['title']));
            $request->request->set('node_name', trim(str_slug($str['title'])));
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);
            $request->request->set('description', trim($str['description']));

            $chk_location = Node::withName(trim(str_slug($str['title'])))->first();

            if (!$chk_location) {

                $this->validateCreateForm($request);

                list($node, $locale) = $this->createNode($request, $parent);

                /*save meta*/
                /*category*/
                $cat = '';
                foreach ($categories as $key => $value) {

                    $cat .= $value . ',';
                }
                $category = rtrim($cat, ',');
                $node->setmeta('categories', $category);
                $node->save();

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
