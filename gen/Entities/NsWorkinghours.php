<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsWorkinghours extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
    protected $fillable = ['hours'];

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
        return ['hours'];
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