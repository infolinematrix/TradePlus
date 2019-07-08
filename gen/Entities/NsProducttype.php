<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsProducttype extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['product_price', 'product_content', 'product_unit', 'product_currency', 'product_discount', 'product_show_price', 'product_moq'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['product_price', 'product_content', 'product_unit', 'product_currency', 'product_discount', 'product_show_price', 'product_moq'];
    }

    /**
     * Returns searchables for the model
     */
    public static function getSearchable()
    {
        return [
            'columns' => [],
            'joins' => [
                
            ]
        ];
    }

    /**
     * Returns mutatables for the model
     */
    public static function getMutatables()
    {
        return [];
    }

}