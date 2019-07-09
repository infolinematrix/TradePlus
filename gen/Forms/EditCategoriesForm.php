<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditCategoriesForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('category_icon', 'text', [
            'label' => 'Icon',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('popular', 'select', [
            'label' => 'Make Popular',
            'help_block' => ['text' => ''],

            
            
            'choices' => ['1' => 'Yes' ,  '0' => 'No']

        ]);
                    }

}