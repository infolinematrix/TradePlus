<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsBusinesstype extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['business_type', 'business_description', 'business_address', 'business_zipcode', 'business_phone', 'business_tollfree', 'business_website'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['business_type', 'business_description', 'business_address', 'business_zipcode', 'business_phone', 'business_tollfree', 'business_website'];
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