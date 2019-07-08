<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsProfile extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['profile_address', 'profile_zipcode', 'profile_phone', 'profile_email', 'profile_landline', 'profile_latitude', 'profile_longitude', 'profile_firstname', 'profile_lastname', 'profile_about', 'featured'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['profile_address', 'profile_zipcode', 'profile_phone', 'profile_email', 'profile_landline', 'profile_latitude', 'profile_longitude', 'profile_firstname', 'profile_lastname', 'profile_about', 'featured'];
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