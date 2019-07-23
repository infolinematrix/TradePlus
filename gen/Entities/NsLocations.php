<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsLocations extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['popular', 'lat', 'long', 'countrycode', 'dialcode'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['popular', 'lat', 'long', 'countrycode', 'dialcode'];
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