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

    public function browse($slug = null, NodeRepository $nodeRepository)
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
            $company = $node->parent()->first();
            $data[] = [
                'id' => $node->getKey(),
                'type' => $node->getNodeTypeName(),
                'source_id' => $node->translate('en')->getKey(),
                'title' => $node->getTitle(),
                'slug' => $node->getName(),
                'description' => strip_tags($node->description),
                'company' => $company->getTitle(),
                'company_location' => getBusinessLocation($company->getKey()),
            ];
        }

        return $data;
    }

}