<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditBasicpageForm extends Form {

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
                        $this->add('content', 'wysiwyg', [
            'label' => 'Content',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
=======
                        $this->add('description', 'textarea', [
            'label' => 'Description',
            'help_block' => ['text' => ''],

>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf
            
            
            

        ]);
                    }

}