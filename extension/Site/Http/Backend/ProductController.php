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
use Reactor\Hierarchy\Node;
use ReactorCMS\Http\Controllers\ReactorController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Documents\Media\Media;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image as ImageFacade;
use Illuminate\Support\Facades\Auth;
use Reactor\Hierarchy\Tags\Tag;
class ProductController extends ReactorController
{
    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;

    public function __construct()
    {

    }

    public function index($node_id)
    {


        $node = Node::find($node_id);

        $nodes = $node->children()->withType('producttype')->paginate();

        return view('Site::backend.product.index', compact('node_id', 'nodes'));
    }

    public function create($node_id)
    {

        $type = get_node_type('producttype');

        $form = $this->getCreateForm(null, null);
        $form->setUrl(route('reactor.business.product.create', $node_id));

        $form->modify('type', 'hidden', [
            'value' => $type->getKey(),

        ]);

        $categories = Node::withType('categories')->where('parent_id', null)->get();

        return view('Site::backend.product.create', compact('node_id', 'form','categories'));
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

        return redirect()->route('reactor.business.product.edit', [
            $node->getKey(),
            $node->translate($locale)->getKey(),
        ]);
    }

    public function edit($node_id, $source)
    {

        list($node, $locale, $source) = $this->authorizeAndFindNode($node_id, $source);

        $form = $this->getEditForm($node_id, $node, $source);
        $form->setUrl(route('reactor.business.product.edit', [$node_id, $source->getKey()]));
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

        return view('Site::backend.product.edit', compact('node', 'form', 'categories', 'category_meta', 'cover'));

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
            ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(600, 400)->save()->save();

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

        return view('Site::backend.product.import', compact('node_id','categories'));

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





                if (trim($row1['product_title']) != null) {

                    $isValid = $this->check_product($request, $id, $row1);

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

    private function check_product($request, $parent = 0, $str)
    {



        $nodeType = get_node_type('producttype');
        $type = $nodeType->getKey();

        if ($str != '') {

            if ($str['category'] != null) {
                $categories = explode(">>", trim($str['category']));
                $cnodeType = get_node_type('categories');
                $ctype = $cnodeType->getKey();

                $parent_id = null;
                if (isset($categories[0])) {

                    $request->request->set('title', trim($categories[0]));
                    $request->request->set('node_name', trim(str_slug($categories[0])));
                    $request->request->set('locale', 'en');
                    $request->request->set('type', $ctype);
                    $request->request->set('meta_title', trim($categories[0]));
                    $request->request->set('meta_keywords', trim($categories[0]));
                    $request->request->set('meta_description', trim($categories[0]));

                    $chk_parent = Node::where('parent_id', null)->withName(trim(str_slug($categories[0])))->first();


                    if (!$chk_parent) {

                        $this->validateCreateForm($request);

                        list($node, $locale) = $this->createNode($request, null);

                        $parent_id = $node->getKey();
                        $meta = $parent_id;
                    } else {


                        $parent_id = $chk_parent->getKey();

                        $meta = $parent_id;

                    }

                }
                $child_id = 0;
                if (isset($categories[1])) {

                    $request->request->set('title', trim($categories[1]));
                    $request->request->set('node_name', trim(str_slug($categories[1])));
                    $request->request->set('locale', 'en');
                    $request->request->set('type', $ctype);
                    $request->request->set('meta_title', trim($categories[1]));
                    $request->request->set('meta_keywords', trim($categories[1]));
                    $request->request->set('meta_description', trim($categories[1]));

                    $chk_child = Node::where('parent_id', $parent_id)->withName(trim(str_slug($categories[1])))->first();
                    if (!$chk_child) {

                        $this->validateCreateForm($request);

                        list($node, $locale) = $this->createNode($request, $parent_id);

                        $child_id = $node->getKey();
                        $meta = $parent_id . ',' . $child_id;
                    } else {


                        $child_id = $chk_child->getKey();

                        $meta = $parent_id . ',' . $child_id;
                    }

                }

                if (isset($categories[2])) {


                    $request->request->set('title', trim($categories[2]));
                    $request->request->set('node_name', trim(str_slug($categories[2])));
                    $request->request->set('locale', 'en');
                    $request->request->set('type', $ctype);
                    $request->request->set('meta_title', trim($categories[2]));
                    $request->request->set('meta_keywords', trim($categories[2]));
                    $request->request->set('meta_description', trim($categories[2]));

                    $chk_children = Node::where('parent_id', $child_id)->withName(trim(str_slug($categories[2])))->first();
                    if (!$chk_children) {

                        $this->validateCreateForm($request);

                        list($node, $locale) = $this->createNode($request, $child_id);

                        $children_id = $node->getKey();
                        $meta = $parent_id . ',' . $child_id . ',' . $children_id;
                    } else {


                        $children_id = $chk_children->getKey();
                        $meta = $parent_id . ',' . $child_id . ',' . $children_id;
                    }

                }


                $request->request->set('title', trim($str['product_title']));
                $request->request->set('node_name', trim(str_slug($str['product_title'])));
                $request->request->set('locale', 'en');
                $request->request->set('type', $type);
                $request->request->set('description', trim($str['description']));


                $chk_product = Node::withName(trim(str_slug($str['product_title'])))->first();

                if (!$chk_product) {

                    $this->validateCreateForm($request);

                    list($node, $locale) = $this->createNode($request, $parent);


                    $node->setmeta('categories', $meta);
                    $node->save();

                    if ($str['keywords'] != null) {
                        $keywords = explode(">>", $str['keywords']);
                        foreach ($keywords as $key => $value) {

                            $tag = Tag::firstByTitleOrCreate(trim($value));

                            $node->attachTag($tag->getKey());
                        }
                    }
                    return true;
                } else {

                    $node_id = $chk_product->getKey();
                    $source = $chk_product->translate('en')->getKey();
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


    public function import_store1($id = null, Request $request)
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

                    $isValid = $this->check_product($request, $id, $row1);

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

    private function check_product1($request, $parent = 0, $str)
    {


        $categories = $request->categories;

        $nodeType = get_node_type('producttype');
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


public function destroy($id)
    {
        //$this->authorize('EDIT_NODES');

        $node = Node::findOrFail($id);

        if ($response = $this->validateNodeIsNotLocked($node)) return $response;

        /*Parent Node's files delete*/
        $files = $node->getImages()->get();
        foreach ($files as $file){

            File::delete(upload_path($file->path));
        }

        $node->delete();

        $this->notify('nodes.destroyed');

        return redirect()->back();
    }
}
