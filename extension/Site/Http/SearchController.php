<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 29/3/18
 * Time: 1:10 PM
 */

namespace extension\Site\Http;


use DaveJamesMiller\Breadcrumbs\Facade as Breadcrumbs;
use Illuminate\Http\Request;
use Reactor\Hierarchy\Node;
use Reactor\Hierarchy\NodeRepository;
use ReactorCMS\Http\Controllers\PublicController;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use Reactor\Hierarchy\Reviewable\HasReviews;

class SearchController extends PublicController
{

    use UsesNodeHelpers, UsesNodeForms;
    use HasReviews;


    public function index(Request $request)
    {
        if ($request->search == null) return redirect()->to('/');

        \Session::forget(['products']);

        $search = trim($request->search);
        return redirect()->route("site.search.products", str_slug($search));
    }

    public function productResult($search)
    {
        $products = Node::withType('product')->withTitle("%$search%");
        \Session::put('products', $search);
        $nodes = $products->paginate(20);

        return $this->compileView('Site::product-list', compact('home', 'nodes'), 'Search for products');
    }


    public function single($name){


        $node = Node::withName($name)->first();
        $data = [];
        if($node){

            $coverimage = $node->getImages()->first();
            if($coverimage){

                $img = asset('uploads/'.$coverimage->path);

            }else{

                $img = '/image-600x400.png';
            }
            $company = $node->parent()->first();
            $company_data = $company->nodeSourceExtensions()->first();



            $company_logo = $company->getImages()->where('img_type','profile')->first();
            if($company_logo){

                $logo = asset('/uploads/'.$company_logo->path);

            }else{

                $logo = '/avatar_male.png';
            }


            $units = config('site.unit');
            if($node->product_unit) {
                foreach ($units as $key => $value) {

                    if ($key == $node->product_unit) {

                        $unit = $value;
                    }
                }
            }else{

                $unit = null;
            }

            /*Payment Accept*/
            $payment_accept = $company_data->payment_accept;

            $payment = json_decode($payment_accept, true);

            $rating = $company->reviews()->avg('rating');
            $total_rev = $company->reviews()->count();

            $data = [
                'id' => $node->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'description' => strip_tags($node->description),
                'meta_description' => strip_tags($node->meta_description),
                'image' => $img,
                'company' => $company->getTitle(),
                'company_slug' => $company->getName(),
                'company_location' => getBusinessLocation($company->getKey()),
                'company_logo' => $logo,
                'company_rating' => $rating,
                'company_reviews' => $total_rev,
                'unit' => $unit,
                'moq' => $node->product_moq,
                'show_price' => $node->show_price,
                'price' => $node->product_price,
                'international_shipping' => ($node->shipping == 'yes' ? 'Yes' : 'No'),
                'payment_accept' => $payment
            ];
        }

        return $data;



    }
    
    
    public function browse($params = null)
    {



        $meta_data1 = '';
        $meta_data2 = '';

        $metas = explode('/', $params);



        /*Browse By Location/Category*/
        if (count($metas) == 1) {

            $meta_data1 = Node::withName($metas[0])->first();

            if ($meta_data1) {

                /*get Business*/
                $business = Node::withType('business')->findMetaValue($meta_data1->getKey())->get();

                /*get Products*/
                $products = Node::withType('producttype')->findMetaValue($meta_data1->getKey())
                    ->published()->whereHas('metas')->sortable('created_at', 'desc')->get();


                $nodes = null;
                if (count($business) > 0) {

                    foreach ($business as $parent) {

                        $products = $parent->children()->withtype('producttype')->published()->whereHas('metas')->sortable('created_at', 'desc')->get();

                        if (count($products) > 0) {
                            foreach ($products as $product) {

                                $nodes[] = $product;
                            }
                        }
                    }

                }else{

                    $nodes = null;
                }

                if (count($products) > 0) {
                    $nodes = $products;
                }

            } else {

                $nodes = null;
            }
           



            if ($nodes != null) {
                $product_data = $this->create_data($nodes);
            } else {
                $product_data = [];
            }
        }




        /*Browse By Products with Location*/
        if (count($metas) == 2) {

            $meta_data1 = Node::withName($metas[0])->first();
            $meta_data2 = Node::withName($metas[1])->first();


            if ($meta_data1 == null || $meta_data2 == null) {

                $nodes = null;

            } else {
                $loc = $meta_data1->getKey();
                $cat = $meta_data2->getKey();

                $parents = Node::withType('business')->findMetaValue($loc)->get();


                if (count($parents) > 0) {
                    foreach ($parents as $parent) {

                        $products = $parent->children()->withtype('producttype')->findMetaValue($cat)
                            ->published()->whereHas('metas')->sortable('created_at', 'desc')->get();

                        if (count($products) > 0) {

                            foreach ($products as $product) {

                                $nodes[] = $product;
                            }
                        }

                    }


                    if ($nodes != null) {
                        $product_data = $this->create_data($nodes);
                    } else {
                        $product_data = [];
                    }

                } else {

                    $product_data = [];
                }

            }

        }




        $data['products'] = $product_data;

       // dd($data['products']);

        if (count($metas) == 1) {
            $data['meta_data'] = [

                'title' => $meta_data1->getTitle(),


            ];
        } else {

            $data['meta_data'] = [

                'location' => $meta_data1->getTitle(),
                'location_slug' => $meta_data1->getName(),
                'category' => $meta_data2->getTitle()
            ];
        }


        return $data;
    }




    private function create_data($nodes = null)
    {
        $data = [];

        foreach ($nodes as $node) {


            $rating = $node->reviews()->avg('rating');
            $total_rev = $node->reviews()->count();

            $coverimage = $node->getImages()->first();
            if($coverimage){

                $img = asset('uploads/'.$coverimage->path);

            }else{

                $img = '/image.png';
            }

            $company = $node->parent()->first();

            $company_logo = $company->getImages()->where('img_type','profile')->first();
            if($company_logo){

                 $logo = asset('/uploads/'.$company_logo->path);

            }else{

                $logo = '/avatar_male.png';
            }
            $data[] = [
                'id' => $node->getKey(),
                'type' => $node->getNodeTypeName(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'description' => strip_tags($node->description),
                'rating' => $rating,
                'reviews' => $total_rev,
                'image' => $img,
                'company' => $company->getTitle(),
                'company_slug' => $company->getName(),
                'company_location' => getBusinessLocation($company->getKey()),
                'company_logo' => $logo
            ];
        }



        return $data;
    }

}
