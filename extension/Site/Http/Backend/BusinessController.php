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
class BusinessController extends ReactorController
{
    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;

    public function __construct()
    {

    }

    public function index()
    {

        $nodes = Node::withType('business')->sortable()
            ->translatedIn(locale())
            ->paginate(20);
        return view('Site::backend.business.index', compact('nodes'));

    }

    public function create()
    {

        $type = get_node_type('business');

        $form = $this->getCreateForm(null, null);
        $form->setUrl(route('reactor.business.create'));

        $form->modify('type', 'hidden', [
            'value' => $type->getKey(),

        ]);

        return view('Site::backend.business.create', compact('form'));

    }

    public function store(Request $request)
    {

        $this->validateCreateForm($request);


        list($node, $locale) = $this->createNode($request, null);

        $this->notify('nodes.created');

        return redirect()->route('reactor.business.edit', [
            $node->getKey(),
            $node->translate($locale)->getKey(),
        ]);

    }

    public function edit($id, $source)
    {

        list($node, $locale, $source) = $this->authorizeAndFindNode($id, $source);

        $form = $this->getEditForm($id, $node, $source);
        $form->setUrl(route('reactor.business.edit', [$id, $source->getKey()]));

        $form->modify('meta_image', 'hidden', [
        ]);

        $form->modify('meta_author', 'hidden', [
        ]);

        $form->modify('business_entity', 'select', [

            'choices' => config('site.entity'),
        ]);

        $form->modify('business_scale', 'select', [

            'choices' => config('site.scale'),
        ]);

        $form->modify('emailenquiry', 'select', [
            'label' => 'Allow email enquiry',
            'choices' => ['true' => 'Yes', 'false' => 'No']
        ]);

        $form->modify('phonemessage', 'select', [
            'label' => 'Allow mobile message',
            'choices' => ['true' => 'Yes', 'false' => 'No']
        ]);

        $locations = Node::withType('locations')->where('parent_id', null)->get();
        $location_meta = $node->metas()->where('key', 'locations')->first();

        if ($location_meta) {
            $metas = explode(',', $location_meta->value);
            $loc = '';
            foreach ($metas as $key => $value) {

                $loca = Node::findOrFail($value);
                if ($loca->parent_id == null) {

                    $loc .= $loca->getKey();
                }

            }
            $location_meta = $loc;
        }


        return view('Site::backend.business.edit', compact('form', 'node', 'locale', 'source', 'locations', 'location_meta'));
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

        $request->request->set('payment_accept', json_encode($request->payment_accept));
        $node->update([
            $locale => $request->all(),
        ]);

        $locations = $request->input('locations');

        $loc = '';
        foreach ($locations as $key => $value) {

            $loc .= $value . ',';
        }
        $location = rtrim($loc, ',');

        //save meta
        $node->setmeta('locations', $location);
        $node->save();

        $this->notify('nodes.edited', 'updated_node_content', $node);

        return redirect()->back();
    }

    public function getPhoto($node_id)
    {

        $node = Node::find($node_id);

        $logo = $node->getImages()->where('img_type', 'profile')->first();
        $cover = $node->getImages()->where('img_type', 'cover')->first();


        return view('Site::backend.business.photo', compact('node', 'logo', 'cover'));

    }

    public function updatePhoto(Request $request)
    {

        $logo = $request->file('logo');
        $node = Node::find($request->node_id);

        if ($logo) {
            $name = str_random(6);
            $ext = $logo->extension();

            $destinationPath = public_path('/uploads');
            $logo->move($destinationPath, $name . '.' . $ext);
            ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(200, 170)->save();

            $profile = $node->getImages()->where('img_type', 'profile')->first();

            if ($profile) {
                File::delete(upload_path($profile->path));
                Media::where('node_id', $node->getKey())->where('img_type', 'profile')->delete();
            }
            //-- Save Image in Database--//
            $media = new Media();
            $media->node_id = $node->getKey();
            $media->path = $name . '.' . $ext;
            $media->name = $name;
            $media->extension = $ext;
            $media->mimetype = $logo->getClientMimeType();
            $media->img_type = 'profile';
            $media->size = 0;
            $media->user_id = Auth::user()->id;
            $media->save();
        }

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

        return redirect()->back()->with('message', "Updated Successfully");
    }

    public function photoDelete($id)
    {

        $media = Media::where('id', $id)->first();

        File::delete(upload_path($media->path));

        Media::where('id', $id)->delete();

        return redirect()->back()->with('message', 'Deleted');

    }

    public function import(){

        $locations = Node::withType('locations')->where('parent_id', null)->get();

        return view('Site::backend.business.import', compact('locations'));

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

            $payment_accept = json_encode($request->payment_accept);
            foreach ($results as $row1) {




                if (trim($row1['business_title']) != null) {

                    $isValid = $this->check_business($request, $payment_accept, $id, $row1);

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

    private function check_business($request, $payment_accept, $parent = 0, $str)
    {

        $locations = $request->locations;
        $business_type = $request->business_entity;
        $scale = $request->business_scale;


        $nodeType = get_node_type('business');
        $type = $nodeType->getKey();

        if ($str != '') {

            $request->request->set('title', trim($str['business_title']));
            $request->request->set('node_name', trim(str_slug($str['business_title'])));
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);
            $request->request->set('business_description', trim($str['description']));
            $request->request->set('business_address', trim($str['address']));
            $request->request->set('business_zipcode', trim($str['address']));
            $request->request->set('business_email', trim($str['email']));
            $request->request->set('business_website', trim($str['website']));
            $request->request->set('business_phone', trim($str['phone']));
            $request->request->set('business_facebook', trim($str['facebook']));
            $request->request->set('business_twitter', trim($str['twitter']));
            $request->request->set('business_linkedin', trim($str['linkedin']));
            $request->request->set('business_youtube', trim($str['youtube']));
            $request->request->set('business_google', trim($str['google']));
            $request->request->set('business_employee', trim($str['no_of_employee']));
            $request->request->set('business_scale', trim($scale));
            $request->request->set('business_entity', trim($business_type));
            $request->request->set('business_established', trim($str['established_year_month']));
            $request->request->set('payment_accept', $payment_accept);

            $chk_location = Node::withName(trim(str_slug($str['business_title'])))->first();

            if (!$chk_location) {

                $this->validateCreateForm($request);

                list($node, $locale) = $this->createNode($request, $parent);

                /*save meta*/
                /*locations*/
                $loc = '';
                foreach ($locations as $key => $value) {

                    $loc .= $value . ',';
                }
                $location = rtrim($loc, ',');

                //save meta
                $node->setmeta('locations', $location);
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
