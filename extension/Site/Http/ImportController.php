<?php


namespace Extension\Site\Http;

use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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


    public function fakeProducts()
    {

        $faker = \Faker\Factory::create();
        $faker->addProvider(new \Bezhanov\Faker\Provider\Commerce($faker));

        $data[] = null;

        for ($i = 0; $i <= 1; $i++) {

            $data[] = [
                'product' => $faker->productName, // Kids & Games
                'keywords' => $faker->department(5, true), // Kids & Games
            ];
        }





        dd($data);

    }

}
