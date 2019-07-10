<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsBusiness extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['business_address', 'business_email', 'business_website', 'business_phone', 'business_facebook', 'business_twitter', 'business_linkedin', 'business_youtube', 'business_google', 'business_employee', 'business_scale', 'business_entity', 'business_established', 'business_long', 'business_lat', 'business_zipcode', 'business_description', 'payment_accept'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['business_address', 'business_email', 'business_website', 'business_phone', 'business_facebook', 'business_twitter', 'business_linkedin', 'business_youtube', 'business_google', 'business_employee', 'business_scale', 'business_entity', 'business_established', 'business_long', 'business_lat', 'business_zipcode', 'business_description', 'payment_accept'];
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