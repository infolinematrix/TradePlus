<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 29/3/18
 * Time: 1:10 PM
 */

namespace extension\Site\Http;

use Extension\Site\Entities\Appointment;
use Extension\Site\Entities\Contact;
use extension\Site\Helpers\UseAppHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Intervention\Image\Facades\Image as ImageFacade;
use Mail;
use ReactorCMS\Entities\Promotion;
use ReactorCMS\Http\Controllers\PublicController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Documents\Media\Media;
use Reactor\Hierarchy\Node;
use Reactor\Hierarchy\NodeRepository;
use Reactor\Hierarchy\NodeSource;
use Reactor\Hierarchy\Tags\Tag;

class BusinessController extends PublicController
{

    use UsesNodeHelpers, UsesNodeForms, UsesTranslations;
    use UseAppHelper;

    public function getProfile(NodeRepository $nodeRepository, $name)
    {
        # code...
        $node = $nodeRepository->getNodeAndSetLocale($name, true, false);

        # image
        $img = $node->getImages()->where('img_type', 'profile')->first();

        $path = 'https://dummyimage.com/300x200/f0f0f0/fff.png&text=Profile';
        if ($img) {
            $path = asset('uploads/' . $img->path);
        }

        #Cover Image
        $coverimage = $node->getImages()->where('img_type', 'cover')->first();
        $coverimg = '/cover.jpg';
        if ($coverimage) {
            $coverimg = asset('uploads/' . $coverimage->path);
        }

        #keywords
        $keywords = null;
        $tags = $node->tags()->get();
        if (count($tags) > 0) {
            foreach ($tags as $tag) {
                $keywords[] = [
                    'title' => $tag->title,
                    'slug' => $tag->tag_name,
                ];
            }
        }

        #working hourss
        $modelName = source_model_name('workinghours', true);
        $hours = $modelName::where('id', $node->translate(locale())->getKey())
            ->where('node_id', $node->getKey())->first();

        $data['id'] = $node->getKey();
        $data['title'] = $node->getTitle();
        $data['address'] = $node->business_address;
        $data['location'] = getBusinessLocation($node->getKey());
        $data['tags'] = $keywords;
        $data['zipcode'] = $node->business_zipcode;
        $data['phone'] = $node->business_phone;
        $data['email'] = $node->business_email;
        $data['website'] = $node->business_website;
        $data['logo'] = $path;
        $data['review_rate'] = $node->getRating();
        $data['review_count'] = $node->getReviews()->count();
        $data['working_hours'] = ($hours ? json_decode($hours->hours) : null);
        $data['coverimage'] = $coverimg;
        $data['about'] = $node->business_description;
        $data['business_employee'] = $node->business_employee;
        $data['business_scale'] = Lang::get('application.scale.'.$node->business_scale);
        $data['business_entity'] = Lang::get('application.entity.'.$node->business_entity);
        $data['business_established'] = $node->business_established;

        return $data;
    }

    public function addBusiness()
    {

        $user = Auth::user();
        $node = Node::withType('business')->where('user_id', $user->id)->first();

        if ($node) {

            $data['node'] = [
                'title' => $node->getTitle(),
                'node_id' => $node->getKey(),
                'source_id' => $node->translate(locale())->getKey(),
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

        $locations = $request->location;


        $check = Node::withType('business')->withName($node_name)->first();


        if ($check != null) {
            return 'exist';
        } else {

            $request->request->set('title', $title);
            $request->request->set('node_name', $node_name);
            $request->request->set('locale', 'en');
            $request->request->set('type', $type);

            $this->validateCreateForm($request);

            list($node, $locale) = $this->createNode($request, null);

            //save meta
            $node->setmeta('locations', $locations);
            $node->save();

            $data = [
                'node_id' => $node->getKey(),
                'source_id' => $node->translate($locale)->getKey(),
            ];

            return $data;
        }
    }

    public function editBusiness()
    {
        /*Scale*/
        $scales = config('site.scale');
        foreach ($scales  as $key => $value){
            $s[] = [
                'id' => $key,
                'name' => $value
            ];
        }
        $data['scales'] = $s;

        /*Entity*/
        $entities = config('site.entity');
        foreach ($entities  as $key => $value){
            $e[] = [
                'id' => $key,
                'name' => $value
            ];
        }
        $data['entities'] = $e;

        $user = Auth::user();
        $business = Node::withType('business')->where('user_id', $user->id)->first();

        if($business) {
            $source = NodeSource::find($business->translate(locale())->getKey());

            $user = Auth::user();
            if ($business || $source) {

                $source = Node::withType('business')->find($source->node_id);
                if ($user->id == $business->user_id && $user->id == $source->user_id) {
                    $data['node'] = $business;

                    $loc_meta = $business->metas()->where('key', 'locations')->first();
                    if ($loc_meta) {
                        $data['locations'] = explode(',', $loc_meta->value);
                    }

                    /*keywoords*/
                    /*
                    $keyword = $data['node']->tags()->get();

                    if (count($keyword) > 0) {
                        foreach ($keyword as $tag) {
                            $tg[] = $tag->title;

                        }

                        $data['keywords'] = $tg;

                    } else {

                        $data['keywords'] = [];
                    }
                    */

                    $data['business'] = 'EXIST';
                } else {
                    $data['business'] = 'NOT EXIST';
                }
            } else {
                $data['business'] = 'NOT EXIST';
            }

            /*Working Hours*/
            /*  $modelName = source_model_name('workinghours', true);
              $hours = $modelName::where('id', $source_id)
                  ->where('node_id', $id)->first();

              if ($hours) {

                  $data['working_hours'] = json_decode($hours->hours);
              } else {

                  $data['working_hours'] = null;
              }

              /*Payment Accept*/

            return $data;
        }else{

            return null;
        }

    }

    public function updateBusiness(Request $request)
    {


        $user = Auth::user();
        $node = Node::withType('business')->where('user_id', $user->id)->first();
        $source = $node->translate(locale())->getKey();

        list($node, $locale, $source) = $this->authorizeAndFindNode($node->getKey(), $source);

        //--Update Node
        $node->update([
            $locale => array_except($request->all(), ['_token', '_method']),
        ]);

        //save meta Locations
        $locations = $request->location;
        
        if ($locations) {


            $node->setmeta('locations', $locations);
            $node->save();
        }

        //--Keywords
        $p_tags = $node->tags()->get();

        /*
        $keywords = $request->input('added_keywords');

        if ($keywords) {

            if (count($p_tags) > 0) {
                foreach ($p_tags as $pt) {
                    $node->detachTag($pt->id);
                }
            }

            $tags = explode(",", $keywords);

            foreach ($tags as $keyword) {
                $tag = Tag::firstByTitleOrCreate($keyword);
                $node->attachTag($tag->getKey());
            }
        }
        if ($request->input('set_tags')) {
            if (count($p_tags) > 0) {

                foreach ($p_tags as $pt) {
                    $node->detachTag($pt->id);
                }
            }
        }*/

        $data = [
            'node_id' => $node->getKey(),
            'source_id' => $node->translate($locale)->getKey(),
        ];

        return $data;
    }


    public function getCategories($parent = 0)
    {

        $data = [];
        /**
         * Omited 'meta' from node "protected $with = ['translations','meta];"
         * You can use Node::with('meta')
         */
      //  $nodes = Node::withType('categories')->translatedIn(locale())->get();

        $nodes = Node::withType('categories');

        if($parent == 0) $nodes->where('parent_id', null);
        if($parent != 0) $nodes->where('parent_id', $parent);


        if($nodes->count() == 0){
          $node = Node::find($parent);
          $par = $node->parent()->first();

          $nodes = Node::withType('categories')->where('parent_id', $par->getKey());

        }

        $categories = $nodes->get();



        foreach ($categories as $node) {
            $data[] = [
                'id' => $node->getKey(),
                'parent_id' => $node->parent_id,
                'source_id' => $node->translate(locale())->getKey(),
                'title' => trim($node->getTitle()),
                'slug' => trim($node->getName())
            ];
        }

        if(count($data) > 0) {

            return $data;
        }else{

            return 'not_found';
        }
    }

    public function getLocations($parent = 0)
    {

        $data = [];
        /**
         * Omited 'meta' from node "protected $with = ['translations','meta];"
         * You can use Node::with('meta')
         */
        $nodes = Node::withType('locations');

        if($parent == 0) $nodes->where('parent_id', null);
        if($parent != 0) $nodes->where('parent_id', $parent);

        $categories = $nodes->get();


        foreach ($categories as $node) {

            $data[] = [
                'id' => $node->getKey(),
                'parent_id' => $node->parent_id,
                'source_id' => $node->translate(locale())->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'popular' => $node->popular,

            ];

        }

        if(count($data) > 0) {

            return $data;
        }else{

            return 'not_found';
        }
    }


}
