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
<<<<<<< HEAD
                        $this->add('category_icon', 'text', [
            'label' => 'Icon',
=======
                        $this->add('popular', 'select', [
            'label' => 'Make Popular',
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf
            'help_block' => ['text' => ''],

            
            
<<<<<<< HEAD
            

        ]);
                                $this->add('popular', 'select', [
            'label' => 'Make Popular',
=======
            'choices' => ['0' => 'No' , '1' => 'Yes']

        ]);
                                $this->add('category_icon', 'text', [
            'label' => 'Icon',
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf
            'help_block' => ['text' => ''],

            
            
<<<<<<< HEAD
            'choices' => ['1' => 'Yes' ,  '0' => 'No']
=======
            
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf

        ]);
                    }

}