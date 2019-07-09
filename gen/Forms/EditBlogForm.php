<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditBlogForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
<<<<<<< HEAD
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
=======
        $this->compose('Nuclear\Hierarchy\Http\Forms\NodeSourceForm');
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf
                        $this->add('content', 'wysiwyg', [
            'label' => 'Content',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                    }

}