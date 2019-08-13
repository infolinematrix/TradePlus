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
use Reactor\Hierarchy\Reviewable\Review;


class ReviewsController extends ReactorController
{
    public function __construct()
    {

    }

    public function index()
    {

        $reviews = Review::orderBy('id','DESC')
            ->paginate(20);


        return view('Site::backend.reviews.index', compact('reviews'));

    }

    public function view($id)
    {

        $review = Review::where('id',$id)->first();

        return view('Site::backend.reviews.view', compact('review'));

    }

    public function status($id){

        $status = Review::where('id',$id)->first();

        if($status->approved == 1){

            Review::where('id',$id)->update(['approved' => 0]);

            return redirect()->back()->with('message', "Unpublished");
        }else{

            Review::where('id',$id)->update(['approved' => 1]);

            return redirect()->back()->with('message', "Published");
        }
    }

    public function destroy($id){

        PostRequirement::where('id',$id)->delete();

        return redirect()->route('reactor.requirement.index')->with('message', "Deleted...");

    }




}
