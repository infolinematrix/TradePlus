<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditServicetypeForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('description', 'wysiwyg', [
            'label' => 'Description',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('emailenquiry', 'text', [
            'label' => 'Email Enquiry',
            'help_block' => ['text' => ''],

            
                        'default_value' => false,
            
            

        ]);
                                $this->add('phonemessage', 'text', [
            'label' => 'Phone/SMS Message',
            'help_block' => ['text' => ''],

            
                        'default_value' => false,
            
            

        ]);
                    }

}