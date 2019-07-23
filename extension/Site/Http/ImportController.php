<?php


namespace Extension\Site\Http;

use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use ReactorCMS\Http\Controllers\PublicController;
use Reactor\Hierarchy\NodeRepository;
use Reactor\Hierarchy\Node;
use ReactorCMS\Http\Controllers\Traits\UsesNodeForms;
use ReactorCMS\Http\Controllers\Traits\UsesNodeHelpers;
use ReactorCMS\Http\Controllers\Traits\UsesTranslations;


class importController extends PublicController
{
    public $parent_node_id;
    use UsesTranslations, UsesNodeHelpers, UsesNodeForms;

    public function location()
    {
        $filename = 'cat_aniques.csv';
        $rows = Excel::load(public_path() . '/data/' . $filename, function ($reader) {
            $reader->toArray();
            $reader->noHeading();
        })->get();

        $locale = 'en';


        foreach ($rows as $row) {

            $item = explode('>', $row[0]);
            $parent_node_id = null;

            foreach ($item as $i => $value) {

                $l = $this->getLocation(str_slug(trim($value)));

                $node = new Node;
                $node->setNodeTypeByKey(49);

                if(!$l ){
                    $data = [
                        'user_id' => 1,
                        'title' => trim($value),
                        'node_name' => str_slug(trim($value)),
                        'meta_title' => trim($value),
                        "meta_keywords" => trim($value),
                        "meta_description" => trim($value)
                    ];
                    $node->fill([
                        $locale => $data,
                    ]);
                    $node = $this->locateNodeInTree($parent_node_id, $node);
                    $node->save();

                }

                //$node->save();
                //dd("EE");
                //list($node, $locale) = $this->createNode($data, $parent_node_id);

                //$parent_node_id = $node->getKey();
                //dd($parent_node_id);
            }
            //DB::table('lecturas_temp')->insert($item );
        }


    }


    public function getLocation($name = null)
    {
        if($name == null) return;

        $node = Node::withType('categories')->withName($name)->first();

        if($node) return $node->getKey();

        return null;

    }

}
