<?php

namespace Extension\Site\Http;

use Extension\Site\Entities\PostRequirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use ReactorCMS\Entities\Subscriber;
use ReactorCMS\Http\Controllers\PublicController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use Reactor\Hierarchy\NodeRepository;
use ReactorCMS\Entities\Settings;
use Mail;
use Illuminate\Support\Facades\Config;
use Reactor\Hierarchy\Node;
class ApiController extends PublicController
{

    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;

    /**
     * Shows a page
     *
     * @param NodeRepository $nodeRepository
     * @param string $name
     * @return View
     */
    public function getPage(NodeRepository $nodeRepository, $name)
    {
        $node = $nodeRepository->getNodeAndSetLocale($name);

        $data = [
            'title' => $node->getTitle(),
            'content' => $node->content,
            'meta_title' => $node->getMetaTitle(),
            'meta_description' => $node->getMetaDescription(),
            'meta_keywords' => $node->getMetaKeywords(),
        ];

        return $data;
    }

    public function getSettings(){

        $data =[];
        $settings = Settings::all();

        foreach($settings as $setting){
            $data[] = [
                'variable' => $setting->variable,
                'value' => $setting->value,
            ];
        }

        return $data;
    }

    public function getPages()
    {
        $nodes = Node::withType('pages')->get();
        $data = [];

        foreach ($nodes as $node) {
            $data[] = [
                'title' => $node->getTitle(),
                'content' => strip_tags($node->content),
                'meta_title' => $node->getMetaTitle(),
                'meta_description' => $node->getMetaDescription(),
                'meta_keywords' => $node->getMetaKeywords(),
            ];

        }

        return $data;
    }

    /**
     * Shows the search page
     *
     * @param string $search
     * @param NodeRepository $nodeRepository
     * @param Request $request
     * @return View
     */
    public function getSearch($search, NodeRepository $nodeRepository, Request $request)
    {
        set_app_locale_with('search', $search);
        $results = $nodeRepository->searchNodes($request->input('q'));

        return view('search', compact('results'));
    }

    public function getBanner($homepage = false, $limit = 2)
    {

        if ($homepage == true) {

            $node = Node::WhereExtensionAttribute('banner', 'show_home', 1);
        } else {

            $node = Node::WhereExtensionAttribute('banner', 'show_home', 0);
        }
        $nodes = $node->take($limit)->get();

        $data = [];
        if (count($nodes) > 0) {

            foreach ($nodes as $node) {
                $data[] = [

                    'title' => $node->getTitle(),
                    'link' => $node->web_link,
                    'path' => asset('/uploads/' . $node->getImages()->first()->path),
                ];
            }
        }

        return $data;

    }


    public function postSubscribe(Request $request){


        
        $s_data = [
            
            'email' => $request->email
        ];
        
        Subscriber::insert($s_data);
        
        $data = [
            'email' => $request->email,
            'site_name' => getSettings('site_title'),
        ];

        /*Get Mail Configuration*/
        Config::set('mail', getMailconfig());

        Mail::send('Site::email.subscribe', $data, function ($message) use ($data) {
            $message->from(getSettings('email_from_email'), getSettings('site_title'));
            $message->subject('Subscriber');
            $message->to('help.matrixinfoline@gmail.com');
        });

        return "SUCCESS";

    }

    public function postRequirement(Request $request){


        $data = [
            'user_id' => Auth::user()->id,
            'category' => $request->category,
            'title' => $request->title,
            'description' => $request->description,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->contact_no,
            'email' => $request->email,
        ];

        PostRequirement::insert($data);

        return "SUCCESS";

    }

    public function requirements(){

        $data = [];

        $requirements = PostRequirement::where('approved',1)->orderBy('id','DESC')->get();

        foreach ($requirements as $requirement){


            $data[] = [

                'id' => $requirement->id,
                'title' => $requirement->title,
                'description' => strip_tags($requirement->description),
                'category' => Node::find($requirement->category)->getTitle(),
                'name' => $requirement->first_name.' '.$requirement->last_name,
                'posted_on' => time_elapsed_string($requirement->created_at)
            ];
        }

        return $data;

    }

    public function sendQuote(Request $request){

        $requirement = PostRequirement::where('id',$request->req_id)->first();


        //$user = Auth::user();

        $node = Node::where('user_id',1)->withType('business')->first();


        $data = [

            'quotation' => $requirement->description,
            'description' => $request->description,
            'business' => $node->getTitle(),
            'slug' => $node->getName(),
            'site_name' => getSettings('site_title'),

        ];


        /*Get Mail Configuration*/
        Config::set('mail', getMailconfig());

        Mail::send('Site::email.quotation', $data, function ($message) use ($data) {
            $message->from(getSettings('email_from_email'), getSettings('site_title'));
            $message->subject('Quotation for your Requirement');
            $message->to('help.matrixinfoline@gmail.com');
        });

        return "SUCCESS";

    }
}
