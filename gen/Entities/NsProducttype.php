<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsProducttype extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['emailenquiry', 'phonemessage', 'description', 'product_price', 'show_price', 'product_unit', 'product_moq', 'shipping'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['emailenquiry', 'phonemessage', 'description', 'product_price', 'show_price', 'product_unit', 'product_moq', 'shipping'];
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