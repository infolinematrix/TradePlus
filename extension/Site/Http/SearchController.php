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

class SearchController extends PublicController
{

    use UsesNodeHelpers, UsesNodeForms;


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


                if (count($business) > 0) {

                    foreach ($business as $parent) {

                        $products = $parent->children()->withtype('producttype')->published()->whereHas('metas')->sortable('created_at', 'desc')->get();

                        if (count($products) > 0) {
                            foreach ($products as $product) {

                                $nodes[] = $product;
                            }
                        } else {

                            $nodes = null;
                        }
                    }

                } else {
                    if (count($products) > 0) {
                        $nodes = $products;
                    } else {
                        $nodes = null;
                    }
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

    public function browse1($slug = null, NodeRepository $nodeRepository)
    {


        //--get Node type
        $node = $nodeRepository->getNode($slug);

        //Assume categories
        $nodes = Node::withType('producttype')
            ->take(10)
            ->findMetaValue($node->getKey())
            ->Published()
            ->get();

        $data = $this->create_data($nodes);

        return $data;
    }


    private function create_data($nodes = null)
    {
        $data = [];

        foreach ($nodes as $node) {



            $coverimage = $node->getImages()->first();
            if($coverimage){

                $img = asset('uploads/'.$coverimage->path);

            }else{

                $img = '/image.png';
            }

            $company = $node->parent()->first();

            $company_logo = $company->getImages()->where('img_type','profile')->first();
            if($company_logo){

                 $logo = $company_logo->path;

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
                'image' => $img,
                'company' => $company->getTitle(),
                'company_location' => getBusinessLocation($company->getKey()),
                'company_logo' => $logo
            ];
        }



        return $data;
    }

}
