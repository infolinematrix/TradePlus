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
                        $this->add('popular', 'select', [
            'label' => 'Make Popular',
            'help_block' => ['text' => ''],

            
            
            'choices' => ['0' => 'No' , '1' => 'Yes']

        ]);
                                $this->add('category_icon', 'text', [
            'label' => 'Icon',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}