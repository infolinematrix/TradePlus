<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsBanner extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['max_impression', 'web_link', 'show_home', 'impressions'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['max_impression', 'web_link', 'show_home', 'impressions'];
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