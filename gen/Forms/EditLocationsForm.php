<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditLocationsForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('popular', 'select', [
            'label' => 'Make Popular',
            'help_block' => ['text' => ''],

            
            
<<<<<<< HEAD
            'choices' => ['1' => 'Yes' , '0' => 'No']

        ]);
                                $this->add('lat', 'double', [
            'label' => 'Latitude',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('long', 'double', [
            'label' => 'Longitude',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            
=======
            'choices' => ['1' => 'YES','1' => 'NO']
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf

        ]);
                    }

}