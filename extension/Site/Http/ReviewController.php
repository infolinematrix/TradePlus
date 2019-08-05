<?php

namespace Extension\Site\Http;


use Illuminate\Http\Request;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;
use ReactorCMS\Http\Controllers\Controller;
use Prophecy\Exception\Prediction\NoCallsException;
use Reactor\Hierarchy\Node;

class ReviewController extends Controller
{

    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;
<<<<<<< HEAD
    use HasReviews;
=======
>>>>>>> e046d7448a7c4526471e006fac8df6a1a97b3005

    public function reviews($node_id){

        $node = Node::find($node_id);
<<<<<<< HEAD
        $reviews = $node->getReviews()->take(25)->get();

=======
        $reviews = $node->reviews()->take(25)->get();
>>>>>>> e046d7448a7c4526471e006fac8df6a1a97b3005
        $data=[];

        foreach($reviews as $review){
            $data[] = [
                'title' => $review->title,
                'description' => $review->body,
                'rating'=> $review->rating,
                'posted_by'=> $review->first_name,
                'posted_on'=> time_elapsed_string($review->created_at),
            ];
        }


        return $data;
    }

    public function store(Request $request){

<<<<<<< HEAD
=======


>>>>>>> e046d7448a7c4526471e006fac8df6a1a97b3005
        $data = [
            'first_name' => $request->name,
            'email' => $request->email,
            'title' => $request->title,
            'body' => $request->description,
            'rating' => $request->rating,
        ];

        $node = Node::find($request->node);

        $node->createReview($data, $node);

        $data['message'] = 'Successfully submited, waiting for modaration';

        return $data;

    }

}
