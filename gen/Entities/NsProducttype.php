<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsProducttype extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['product_description'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['product_description'];
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