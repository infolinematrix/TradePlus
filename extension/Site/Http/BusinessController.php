<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 29/3/18
 * Time: 1:10 PM
 */

namespace extension\Site\Http;

use extension\Site\Helpers\UseAppHelper;
use function GuzzleHttp\json_encode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Intervention\Image\Facades\Image as ImageFacade;
use ReactorCMS\Http\Controllers\PublicController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Documents\Media\Media;
use Reactor\Hierarchy\Node;
use Reactor\Hierarchy\NodeRepository;
use Reactor\Hierarchy\NodeSource;
use Mail;

class BusinessController extends PublicController
{

    use UsesNodeHelpers, UsesNodeForms, UsesTranslations;
    use UseAppHelper;


    public function addBusiness()
    {

        $user = Auth::user();
        $node = Node::withType('business')->where('user_id', $user->id)->first();

        /*Entity*/
        $entities = config('site.entity');
        foreach ($entities as $key => $value) {
            $e[] = [
                'id' => $key,
                'name' => $value,
            ];
        }
        $data['entities'] = $e;

        if ($node) {
            /*Profile Image*/
            $profileimage = $node->getImages()->where('img_type', 'profile')->first();
            $profileimg = '/avatar_male.png';

            if ($profileimage) {

                $profileimg = asset('uploads/' . $profileimage->path);
            }

            /*Cover Image*/
            $coverimage = $node->getImages()->where('img_type', 'cover')->first();
            $coverimg = '/cover.jpg';
            if ($coverimage) {

                $coverimg = asset('uploads/' . $coverimage->path);
            }
            $data['node'] = [
                'title' => $node->getTitle(),
                'node_id' => $node->getKey(),
                'source_id' => $node->translate(locale())->getKey(),
                'profileImage' => $profileimg,
                'coverImage' => $coverimg,
            ];

        } else {

            $data['node'] = null;
        }

        return $data;
    }
    public function postBusiness(Request $request)
    {

        $nodeType = get_node_type('business');
        $type = $nodeType->getKey();

        $title = $request->input('title');
        $node_name = str_slug($title);

        /*Location Meta*/
        $loc = $request->location;
        if ($loc) {
            $locations = Node::find($loc);
            $nodes = $locations->getAncestors();
            if (count($nodes) > 0) {
                $l = '';
                foreach ($nodes as $n) {
                    $l .= $n->getKey() . ',' . $request->location . ',';
                }
                $location = rtrim($l, ',');
                $ll[] = $location;
            }
        }
        /*Location Meta*/

        $check = Node::withType('business')->withName($node_name)->first();

        if ($check != null) {

            $data = 'exist';
        } else {

            $request->request->set('title', $title);
            $request->request->set('node_name', $node_name);
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);

            $this->validateCreateForm($request);

            list($node, $locale) = $this->createNode($request, null);

            //save meta
            /*Location Meta*/
            if ($loc) {
                if (count($nodes) > 0) {
                    $node->setmeta('locations', $ll);
                } else {
                    $node->setmeta('locations', $loc);
                }
                $node->save();
            }
            /*Location Meta*/

            /*Profile Image*/

            $profileimage = $request->file('profileimage');

            if ($profileimage) {

                # code...
                $name = str_random(6);
                $ext = $profileimage->extension();

                $destinationPath = public_path('/uploads');
                $profileimage->move($destinationPath, $name . '.' . $ext);
                ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(200, 170)->save();

                //-- Save Image in Database--//
                $media = new Media();
                $media->node_id = $node->getKey();
                $media->path = $name . '.' . $ext;
                $media->name = $name;
                $media->extension = $ext;
                $media->mimetype = $profileimage->getClientMimeType();
                $media->img_type = 'profile';
                $media->size = 0;
                $media->user_id = Auth::user()->id;
                $media->save();
            }
            /*Cover Image*/
            $coverimage = $request->file('coverimage');
            if ($coverimage) {

                # code...
                $name = str_random(6);
                $ext = $coverimage->extension();

                $destinationPath = public_path('/uploads');
                $coverimage->move($destinationPath, $name . '.' . $ext);
                ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(850, 300)->save();

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

            $data = [
                'node_id' => $node->getKey(),
                'source_id' => $node->translate($locale)->getKey(),
            ];

        }
        return $data;
    }

    public function editBusiness()
    {
        /*Scale*/
        $scales = config('site.scale');
        foreach ($scales as $key => $value) {
            $s[] = [
                'id' => $key,
                'name' => $value,
            ];
        }
        $data['scales'] = $s;

        /*Entity*/
        $entities = config('site.entity');
        foreach ($entities as $key => $value) {
            $e[] = [
                'id' => $key,
                'name' => $value,
            ];
        }
        $data['entities'] = $e;

        $user = Auth::user();
        $business = Node::withType('business')->where('user_id', $user->id)->first();

        if ($business) {
            $source = NodeSource::find($business->translate(locale())->getKey());

            $user = Auth::user();
            if ($business || $source) {

                $source = Node::withType('business')->find($source->node_id);
                if ($user->id == $business->user_id && $user->id == $source->user_id) {
                    $node = $business;

                    $data['node'] = [
                        'title' => $node->getTitle(),
                        'address' => $node->business_address,
                        'email' => $node->business_email,
                        'website' => $node->business_website,
                        'phone' => $node->business_phone,
                        'zipcode' => $node->business_zipcode,
                        'description' => $node->description,
                        'facebook' => $node->business_facebook,
                        'twitter' => $node->business_twitter,
                        'linkedin' => $node->business_linkedin,
                        'youtube' => $node->business_youtube,
                        'google' => $node->business_google,
                        'employee' => $node->business_employee,
                        'scale' => $node->business_scale,
                        'business_type' => $node->business_entity,
                        'estabished' => $node->business_established,
                        'status' => $node->isPublished() ? 'publish' : 'unpublish',
                        'email_enquiry' => $node->emailenquiry,
                        'phone_message' => $node->phonemessage,
                    ];

                    $loc_meta = $business->metas()->where('key', 'locations')->first();
                    if ($loc_meta) {
                        $locations = explode(',', $loc_meta->value);
                        $location = Node::find(max($locations));
                        $data['location'] = [

                            'id' => $location->getKey(),
                            'title' => $location->getTitle(),
                        ];
                    }

                    $data['business'] = 'EXIST';
                } else {
                    $data['business'] = 'NOT EXIST';
                }
            } else {
                $data['business'] = 'NOT EXIST';
            }

            /*Payment Accept*/
            $payment_accept = $business->payment_accept;

            if ($payment_accept) {

                foreach (config('site.payment_accept') as $key => $value) {

                    $payment = json_decode($payment_accept, true);
                    if ($payment != null) {
                        $data['payment_accept'][] = (in_array($key, $payment));
                    } else {

                        $data['payment_accept'][] = null;
                    }
                }

            } else {

                $data['payment_accept'][] = null;

            }

            /*Payment Accept*/

            /*Working Hours*/
            $modelName = source_model_name('workinghours', true);
            $hours = $modelName::where('id', $node->translate('en')->getKey())
                ->where('node_id', $node->getKey())->first();

            if ($hours) {

                $data['working_hours'] = json_decode($hours->hours);
            } else {

                $data['working_hours'] = null;
            }

            return $data;
        } else {

            return null;
        }

    }

    public function updateBusiness(Request $request)
    {
        $user = Auth::user();

        $node = Node::withType('business')->where('user_id', $user->id)->first();
        $source = $node->translate(locale())->getKey();

        list($node, $locale, $source) = $this->authorizeAndFindNode($node->getKey(), $source);

        /*Payment Accept*/
        if ($request->accept_payment) {
            $request->request->set('payment_accept', json_encode($request->payment));
        }

        //--Update Node
        $node->update([
            $locale => array_except($request->all(), ['_token', '_method', 'status']),
        ]);

        if ($request->status) {
            $status = $request->status;

            $node->{$status}()->save();
        }

        //save meta Locations
        /*Location Meta*/
        $loc = $request->location;
        if ($loc) {
            $locations = Node::find($loc);
            $nodes = $locations->getAncestors();
            if (count($nodes) > 0) {
                $l = '';
                foreach ($nodes as $n) {
                    $l .= $n->getKey() . ',' . $request->location . ',';
                }
                $location = rtrim($l, ',');
                $ll[] = $location;
            }
            /*Location Meta*/

            /*Location Meta*/
            if (count($nodes) > 0) {
                $node->setmeta('locations', $ll);
            } else {
                $node->setmeta('locations', $loc);
            }
            $node->save();
        }

        /*Profile Image*/

        $profileimage = $request->file('profileimage');

        if ($profileimage) {

            # code...
            $name = str_random(6);
            $ext = $profileimage->extension();

            $destinationPath = public_path('/uploads');
            $profileimage->move($destinationPath, $name . '.' . $ext);
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
            $media->mimetype = $profileimage->getClientMimeType();
            $media->img_type = 'profile';
            $media->size = 0;
            $media->user_id = Auth::user()->id;
            $media->save();
        }

        /*Cover Image*/
        $coverimage = $request->file('coverimage');
        if ($coverimage) {

            # code...
            $name = str_random(6);
            $ext = $coverimage->extension();

            $destinationPath = public_path('/uploads');
            $coverimage->move($destinationPath, $name . '.' . $ext);
            ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(850, 300)->save();

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


        /*Working Hours*/
        $input = $request->all();
        $array = [];

        for ($i = 0; $i < 7; $i++) {
            if ($input['hourstatus'][$i] == 'false') {

                $ar[] = 'false';

            }
            $array[$i] = [
                'day' => $input['day'][$i],
                'status' => $input['hourstatus'][$i],
                'open' => $input['open'][$i],
                'close' => $input['close'][$i],
            ];
        }

        $json_data = json_encode($array);



        /*Insert or Update Working Hours*/
        $modelName = source_model_name('workinghours', true);

        $custom_table_class = new $modelName;
        $cModel = $modelName::where('id', $node->translate($locale)->getKey())
            ->where('node_id', $node->getKey())->first();



        if ($cModel) {
            $request->request->set('id', $node->translate($locale)->getKey());
            $request->request->set('node_id', $node->getKey());
            $request->request->set('hours', $json_data);
            $data = array_except($request->all(), ['business_employee','business_established','business_facebook',
                'business_google','business_linkedin',
                'business_scale','business_twitter',
                'business_youtube','hourstatus', 'open', 'close', 'day']);
            $custom_table_class->where('id', $node->translate($locale)->getKey())->update($data);

        } else {

            $request->request->set('id', $node->translate($locale)->getKey());
            $request->request->set('node_id', $node->getKey());
            $request->request->set('hours', $json_data);
            $data = array_except($request->all(), ['business_employee','business_established','business_facebook',
                'business_google','business_linkedin',
                'business_scale','business_twitter',
                'business_youtube','hourstatus', 'open', 'close', 'day']);
            $custom_table_class->insert($data);

        }
        /*Working Hours*/

        $data = [
            'node_id' => $node->getKey(),
            'source_id' => $node->translate($locale)->getKey(),
        ];

        return $data;
    }

    public function postServices(Request $request)
    {

        /*Get Businesss*/
        $user = Auth::user();
        $business = Node::withType('business')->where('user_id', $user->id)->first();
        /*Get Business*/
        $nodeType = get_node_type('servicetype');
        $type = $nodeType->getKey();

        $title = $request->input('title');
        $node_name = str_slug($title);
        $check = Node::withType('servicetype')->withName($node_name)->first();

        if ($check != null) {
            $data = 'exist';
        } else {

            /*Category Meta*/
            $cat = $request->category;
            $categories = Node::find($cat);
            $nodes = $categories->getAncestors();
            if (count($nodes) > 0) {
                $c = '';
                foreach ($nodes as $n) {
                    $c .= $n->getKey() . ',' . $request->category . ',';
                }
                $category = rtrim($c, ',');
                $cc[] = $category;
            }
            /*Category Meta*/

            $request->request->set('title', $title);
            $request->request->set('node_name', $node_name);
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);

            $this->validateCreateForm($request);

            list($node, $locale) = $this->createNode($request, $business->getKey());

            /*Category Meta*/
            if (count($nodes) > 0) {
                $node->setmeta('categories', $cc);
            } else {
                $node->setmeta('categories', $cat);
            }
            $node->save();
            /*Category Meta*/

            /*Cover Image*/
            $coverimage = $request->file('coverimage');
            if ($coverimage) {

                # code...
                $name = str_random(6);
                $ext = $coverimage->extension();

                $destinationPath = public_path('/uploads');
                $coverimage->move($destinationPath, $name . '.' . $ext);
                ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(850, 300)->save();

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

            $data = [
                'node_id' => $node->getKey(),
                'source_id' => $node->translate($locale)->getKey(),
            ];
        }
        return $data;

    }

    public function editPost($id, $source_id = null)
    {

        $source = NodeSource::find($source_id);
        $service = Node::withType('servicetype')->find($id);

        /*Cover Image*/
        $coverimage = $service->getImages()->where('img_type', 'cover')->first();
        $coverimg = '/cover.jpg';
        if ($coverimage) {

            $coverimg = asset('uploads/' . $coverimage->path);
        }

        $user = Auth::user();
        if ($service || $source) {

            $source = Node::withType('servicetype')->find($source->node_id);
            if ($user->id == $service->user_id && $user->id == $source->user_id) {
                $data['node'] = [
                    'title' => $service->getTitle(),
                    'description' => $service->description,
                    'status' => $service->isPublished() ? 'publish' : 'unpublish',
                    'email_enquiry' => $service->emailenquiry,
                    'phone_message' => $service->phonemessage,
                    'coverimage' => $coverimg,
                ];

                $cat_meta = $service->metas()->where('key', 'categories')->first();
                if ($cat_meta) {
                    $categories = explode(',', $cat_meta->value);
                    $category = Node::find(max($categories));
                    $data['category'] = [

                        'id' => $category->getKey(),
                        'title' => $category->getTitle(),
                    ];

                }

            }
        }

        return $data;

    }

    public function postProduct(Request $request)
    {

        /*Get Businesss*/
        $user = Auth::user();
        $business = Node::withType('business')->where('user_id', $user->id)->first();
        /*Get Business*/
        $nodeType = get_node_type('producttype');
        $type = $nodeType->getKey();

        $title = $request->input('title');
        $node_name = str_slug($title);
        $check = Node::withType('producttype')->withName($node_name)->first();

        if ($check != null) {
            $data = 'exist';
        } else {

            /*Category Meta*/
            $cat = $request->category;
            $categories = Node::find($cat);
            $nodes = $categories->getAncestors();
            if (count($nodes) > 0) {
                $c = '';
                foreach ($nodes as $n) {
                    $c .= $n->getKey() . ',' . $request->category . ',';
                }
                $category = rtrim($c, ',');
                $cc[] = $category;
            }
            /*Category Meta*/

            $request->request->set('title', $title);
            $request->request->set('node_name', $node_name);
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);

            $this->validateCreateForm($request);

            list($node, $locale) = $this->createNode($request, $business->getKey());

            /*Category Meta*/
            if (count($nodes) > 0) {
                $node->setmeta('categories', $cc);
            } else {
                $node->setmeta('categories', $cat);
            }
            $node->save();
            /*Category Meta*/

            /*Cover Image*/
            $coverimage = $request->file('coverimage');
            if ($coverimage) {

                # code...
                $name = str_random(6);
                $ext = $coverimage->extension();

                $destinationPath = public_path('/uploads');
                $coverimage->move($destinationPath, $name . '.' . $ext);
                ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(850, 300)->save();

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

            $data = [
                'node_id' => $node->getKey(),
                'source_id' => $node->translate($locale)->getKey(),
            ];
        }
        return $data;

    }

    public function editProduct($id, $source_id = null)
    {

        /*Scale*/
        $unit = config('site.unit');
        foreach ($unit as $key => $value) {
            $s[] = [
                'id' => $key,
                'name' => $value,
            ];
        }
        $data['units'] = $s;

        $source = NodeSource::find($source_id);
        $product = Node::withType('producttype')->find($id);

        /*Cover Image*/
        $coverimage = $product->getImages()->where('img_type', 'cover')->first();
        $coverimg = '/cover.jpg';
        if ($coverimage) {

            $coverimg = asset('uploads/' . $coverimage->path);
        }

        $user = Auth::user();

        if ($product || $source) {

            $source = Node::withType('producttype')->find($source->node_id);
            if ($user->id == $product->user_id && $user->id == $source->user_id) {
                $data['node'] = [
                    'title' => $product->getTitle(),
                    'description' => $product->description,
                    'status' => $product->isPublished() ? 'publish' : 'unpublish',
                    'email_enquiry' => $product->emailenquiry,
                    'phone_message' => $product->phonemessage,
                    'show_price' => $product->show_price,
                    'product_price' => ($product->product_price ? $product->product_price : 0.00),
                    'product_unit' => $product->product_unit,
                    'product_moq' => $product->product_moq,
                    'international_shipping' => ($product->shipping ? $product->shipping : 'no'),
                    'coverimage' => $coverimg,
                ];

                $cat_meta = $product->metas()->where('key', 'categories')->first();
                if ($cat_meta) {
                    $categories = explode(',', $cat_meta->value);
                    $category = Node::find(max($categories));
                    $data['category'] = [

                        'id' => $category->getKey(),
                        'title' => $category->getTitle(),
                    ];

                }

            }
        }

        return $data;

    }

    public function updatePost(Request $request, $node_id, $source)
    {

        list($node, $locale, $source) = $this->authorizeAndFindNode($node_id, $source);

        //--Update Node
        $node->update([
            $locale => array_except($request->all(), ['_token', '_method', 'status']),
        ]);

        if ($request->status) {
            $status = $request->status;

            $node->{$status}()->save();
        }

        /*Category Meta*/
        $cat = $request->category;
        if ($cat) {
            $categories = Node::find($cat);
            $nodes = $categories->getAncestors();
            if (count($nodes) > 0) {
                $c = '';
                foreach ($nodes as $n) {
                    $c .= $n->getKey() . ',' . $request->category . ',';
                }
                $category = rtrim($c, ',');
                $cc[] = $category;
            }

            /*Category Meta*/

            /*Category Meta*/
            if (count($nodes) > 0) {
                $node->setmeta('categories', $cc);
            } else {
                $node->setmeta('categories', $cat);
            }
            $node->save();
        }
        /*Category Meta*/

        /*Cover Image*/
        $coverimage = $request->file('coverimage');
        if ($coverimage) {

            # code...
            $name = str_random(6);
            $ext = $coverimage->extension();

            $destinationPath = public_path('/uploads');
            $coverimage->move($destinationPath, $name . '.' . $ext);
            ImageFacade::make(sprintf('uploads/%s', $name . '.' . $ext))->resize(850, 300)->save();

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

        return "DATA UPDATED";

    }

    public function getCategories($parent = 0)
    {

        $data = [];

        $nodes = Node::withType('categories');

        if ($parent == 0) {
            $nodes->where('parent_id', null);
        }

        if ($parent != 0) {
            $nodes->where('parent_id', $parent);
        }

        if ($nodes->count() == 0) {
            $node = Node::find($parent);
            $par = $node->parent()->first();

            $nodes = Node::withType('categories')->where('parent_id', $par->getKey());

        }

        $categories = $nodes->published()->get();

        foreach ($categories as $node) {

            $anc = $node->ancestors;
            //$anc = $node->whereAncestorOrSelf($node->getKey())->get();
            $brc[] = [
                'id' => null,
                'title' => 'All',
            ];

            $b = [];

            foreach ($anc as $a) {
                $b[] = [
                    'id' => $a->getKey(),
                    'title' => $a->getTitle(),
                ];
            }

            $breadcrumb = array_merge($brc, $b);

            $data[] = [
                'id' => $node->getKey(),
                'parent_id' => $node->parent_id,
                'source_id' => $node->translate(locale())->getKey(),
                'title' => trim($node->getTitle()),
                'slug' => trim($node->getName()),
                'breadcrumb' => $breadcrumb,
                'icon' => asset('assets/icons/' . $node->category_icon),
            ];
        }

        if (count($data) > 0) {
            return $data;
        } else {

            return 'not_found';
        }
    }

    /**Location */
    public function getLocations($parent = 0, $limit = 12)
    {

        $data = [];

        $nodes = Node::withType('locations');

        if ($parent == 0) {
            $nodes->where('parent_id', null);
        }

        if ($parent != 0) {
            $nodes->where('parent_id', $parent);
        }

        if ($nodes->count() == 0) {
            $node = Node::find($parent);
            $par = $node->parent()->first();

            $nodes = Node::withType('locations')->where('parent_id', $par->getKey());

        }

        if($limit > 0){

            $locations = $nodes->take($limit)->get();
        }else{

            $locations = $nodes->get();
        }

        foreach ($locations as $node) {

            $anc = $node->ancestors;
            //$anc = $node->whereAncestorOrSelf($node->getKey())->get();
            $brc[] = [
                'id' => null,
                'title' => 'All',
            ];

            $b = [];

            foreach ($anc as $a) {
                $b[] = [
                    'id' => $a->getKey(),
                    'title' => $a->getTitle(),
                ];
            }

            $breadcrumb = array_merge($brc, $b);

            $data[] = [
                'id' => $node->getKey(),
                'parent_id' => $node->parent_id,
                'source_id' => $node->translate(locale())->getKey(),
                'title' => trim($node->getTitle()),
                'slug' => trim($node->getName()),
                'breadcrumb' => $breadcrumb,
            ];
        }

        if (count($data) > 0) {
            return $data;
        } else {

            return 'not_found';
        }
    }

    public function getLocation(NodeRepository $nodeRepository, $id){

      $node = $nodeRepository->getNodeById($id,false);

        $data = [
            'id' => $node->getKey(),
            'title' => $node->getTitle(),
            'slug' => $node->getName(),
        ];
      return $data;

    }

    public function All()
    {

        $user = Auth::user();
        $nodes = Node::where('user_id', $user->id)->paginate(20);

        $data = [];

        foreach ($nodes as $node) {

            $nodeType = $node->nodeType()->first()->name;

            if ($node->getNodeTypeName() == 'business') {
                $img = $node->getImages()->where('img_type', 'profile')->first();

            } else {
                $img = $node->getImages()->first();
            }
            if ($img) {
                $img = asset('/uploads/' . $img->path);
            } else {

                $img = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
            }

            $data[] = [

                'type' => $nodeType,
                'id' => $node->getKey(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'image' => $img,

            ];
        }

        return $data;

    }
    public function getProducts()
    {

        $user = Auth::user();
        $node = Node::withType('business')->where('user_id', $user->id)->first();

        $nodes = $node->children()->withType('producttype')->paginate(20);

        $data = [];

        foreach ($nodes as $node) {

            $img = $node->getImages()->first();
            if ($img) {
                $img = asset('/uploads/' . $img->path);
            } else {

                $img = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
            }
            $data[] = [

                'type' => $node->getNodeTypeName(),
                'id' => $node->getKey(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'image' => $img,
                'description' => strip_tags(str_limit($node->description, 50)),
            ];


        }

        return $data;

    }

    public function getServices()
    {

        $user = Auth::user();
        $node = Node::withType('business')->where('user_id', $user->id)->first();

        $nodes = $node->children()->withType('servicetype')->paginte(20);

        $data = [];

        foreach ($nodes as $node) {

            $img = $node->getImages()->first();
            if ($img) {
                $img = asset('/uploads/' . $img->path);
            } else {

                $img = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
            }
            $data[] = [

                'type' => $node->getNodeTypeName(),
                'id' => $node->getKey(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'image' => $img,
                'description' => strip_tags(str_limit($node->description, 50)),
            ];
        }

        return $data;

    }

    public function deletePost($node_id)
    {

        //$this->authorize('EDIT_NODES');

        $node = Node::findOrFail($node_id);

        if ($response = $this->validateNodeIsNotLocked($node)) {
            return $response;
        }

        /*Parent Node's files delete*/
        $files = $node->getImages()->get();
        foreach ($files as $file) {

            File::delete(upload_path($file->path));
        }

        $node->delete();

        $this->notify('nodes.destroyed');

        $data = [];

        $user = Auth::user();
        $nodes = Node::where('user_id', $user->id)->get();

        foreach ($nodes as $node) {

            $nodeType = $node->nodeType()->first()->name;

            if ($node->getNodeTypeName() == 'business') {
                $img = $node->getImages()->where('img_type', 'profile')->first();

            } else {
                $img = $node->getImages()->first();
            }
            if ($img) {
                $img = asset('/uploads/' . $img->path);
            } else {

                $img = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
            }

            $data[] = [
                'type' => $nodeType,
                'id' => $node->getKey(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'image' => $img,

            ];
        }

        return $data;
    }

    public function destroy()
    {
        $user = Auth::user();
        $node = Node::where('user_id', $user->id)->first();

        if ($response = $this->validateNodeIsNotLocked($node)) {
            return $response;
        }

        /*Child node's files delete*/
        $childs = $node->children()->get();
        foreach ($childs as $child) {

            $photos = $child->getImages()->get();

            foreach ($photos as $photo) {
                File::delete(upload_path($photo->path));
            }

        }

        /*Parent Node's files delete*/
        $files = $node->getImages()->get();
        foreach ($files as $file) {

            File::delete(upload_path($file->path));
        }

        $node->delete();

        $this->notify('nodes.destroyed');

        return "Deleted";
    }


    public function getBusiness(){

        $nodes = Node::withType('business')->Published()->sortable()->take(3)->get();

        $data = [];

        foreach ($nodes as $node){

            $coverimg = $node->getImages()->where('img_type','cover')->first();
            $profileimg = $node->getImages()->where('img_type','profile')->first();

            if($coverimg){

                $coverimg = asset('/uploads/'.$coverimg->path);
            }else{

                $coverimg = '/cover.jpg';
            }

            if($profileimg){

                $profileimg = asset('/uploads/'.$profileimg->path);
            }else{

                $profileimg = '/avatar_male.png';
            }
            $data[] = [

                'id' => $node->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'description' => strip_tags(str_limit($node->description,130)),
                'coverimage' => $coverimg,
                'profileimage' => $profileimg,

                'location' => getBusinessLocation($node->getKey())
            ];
        }

        return $data;
    }

    //** Recently created products */
    public function recent_products($limit = 50)
    {
        $data=[];

        $nodes = Node::withType('producttype')->Sortable()->take($limit)->get();

        foreach ($nodes as $node) {

            $img = $node->getImages()->first();
            if ($img) {
                $img = asset('/uploads/' . $img->path);
            } else {

                $img = 'http://lorempixel.com/400/300/abstract/';
            }
            $data[] = [

                'type' => $node->getNodeTypeName(),
                'id' => $node->getKey(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'image' => $img,
                'description' => strip_tags(str_limit($node->description, 100))
            ];
        }

        return $data;
    }

    public function postquote(Request $request)
    {



        $product = Node::withName($request->node_name)->first();

        $company = $product->parent()->withType('business')->first();
        $company = $company->nodeSourceExtensions()->first();



        $data = [
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->contact_no,
            'quantity' => $request->quantity,
            'content' => $request->message,
            'product' => $product,
            'business_email' => $company->business_email,
            'site_name' => getSettings('site_title'),
        ];




        /*Get Mail Configuration*/
        Config::set('mail', getMailconfig());

        Mail::send('Site::email.quote', $data, function ($message) use ($data) {
            $message->from(getSettings('email_from_email'), getSettings('site_title'));
            $message->subject('New Order');
            $message->to($data['business_email']);
        });

        return "SUCCESS";

    }

    public function single($name){


        $node = Node::withName($name)->first();
        $data = [];
        if($node){

            $coverimage = $node->getImages()->where('img_type','cover')->first();
            if($coverimage){

                $img = asset('uploads/'.$coverimage->path);

            }else{

                $img = '/cover.jpg';
            }



            $profileimage = $node->getImages()->where('img_type','profile')->first();
            if($profileimage){

                $logo = asset('/uploads/'.$profileimage->path);

            }else{

                $logo = '/avatar_male.png';
            }

            /*Type*/
            $entities = config('site.entity');
            foreach ($entities as $key => $value){

                if($key == $node->business_entity) {
                    $business_type = $value;
                    }
            }

            /*Size*/

            $scales = config('site.scale');
            if($node->business_scale){

                foreach ($scales as $key => $value){


                    if($node->business_scale == $key){

                        $scale = $value;
                    }
                }
            }else{

                $scale = null;
            }

            /*Payment Accept*/
            $payment_accept = $node->payment_accept;
            $payment = json_decode($payment_accept, true);

            /*Working Hours*/
            $modelName = source_model_name('workinghours', true);
            $hours = $modelName::where('id', $node->translate('en')->getKey())
                ->where('node_id', $node->getKey())->first();

            if ($hours) {

                $working_hours = json_decode($hours->hours);
            } else {

                $working_hours = null;
            }





            $data = [

                'id' => $node->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'description' => strip_tags($node->description),
                'meta_description' => strip_tags($node->meta_description),
                'profileimage' => $logo,
                'coverimage' => $img,
                'address' => $node->business_address,
                'zipcode' => $node->business_zipcode,
                'location' => getBusinessLocation($node->getKey()),
                'type' => $business_type,
                'size' => $scale,
                'no_of_employee' => $node->business_employee,
                'established' => $node->business_established,
                'payment_accept' => $payment,
                'working_hours' => $working_hours

            ];
        }

        return $data;



    }
}
