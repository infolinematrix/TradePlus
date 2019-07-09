<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditProducttypeForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('product_description', 'wysiwyg', [
            'label' => 'Description',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}