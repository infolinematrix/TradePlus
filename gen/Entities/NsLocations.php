<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Entities;


use Reactor\Hierarchy\NodeSourceExtension;

class NsLocations extends NodeSourceExtension {

    /**
     * The fillable fields for the model.
     */
<<<<<<< HEAD
    protected $fillable = ['popular', 'lat', 'long'];
=======
    protected $fillable = ['popular'];
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf

    /**
     * Returns the fields for the model
     */
    public static function getSourceFields()
    {
<<<<<<< HEAD
        return ['popular', 'lat', 'long'];
=======
        return ['popular'];
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf
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