<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditWorkinghoursForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
<<<<<<< HEAD
                        $this->add('hours', 'textarea', [
            'label' => 'Hours',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }
=======
            }
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf

}