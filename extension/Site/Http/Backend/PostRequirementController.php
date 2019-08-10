<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 2/5/18
 * Time: 2:01 PM
 */

namespace extension\Site\Http\Backend;

use Illuminate\Http\Request;
use Reactor\Hierarchy\Node;
use ReactorCMS\Http\Controllers\ReactorController;
use Illuminate\Support\Facades\Auth;
use Extension\Site\Entities\PostRequirement;
class PostRequirementController extends ReactorController
{
    public function __construct()
    {

    }

    public function index()
    {

        $requirements = PostRequirement::orderBy('id','DESC')
            ->paginate(20);
        return view('Site::backend.requirement.index', compact('requirements'));

    }

    public function view($id)
    {

        $requirement = PostRequirement::where('id',$id)->first();
        return view('Site::backend.requirement.view', compact('requirement'));

    }

    public function status($id){

        $status = PostRequirement::where('id',$id)->first();

        if($status->approved == 1){

            PostRequirement::where('id',$id)->update(['approved' => 0]);

            return redirect()->back()->with('message', "Unpublished");
        }else{

            PostRequirement::where('id',$id)->update(['approved' => 1]);

            return redirect()->back()->with('message', "Published");
        }
    }

    public function destroy($id){

        PostRequirement::where('id',$id)->delete();

        return redirect()->route('reactor.requirement.index')->with('message', "Deleted...");

    }




}
