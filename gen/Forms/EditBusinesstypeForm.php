<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditBusinesstypeForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('business_type', 'number', [
            'label' => 'Business Type',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_description', 'textarea', [
            'label' => 'Write about your Business',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('business_address', 'text', [
            'label' => 'Address',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('business_zipcode', 'text', [
            'label' => 'Zip Code',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('business_phone', 'text', [
            'label' => 'Phone Number',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('business_tollfree', 'text', [
            'label' => 'Toll Free',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_website', 'text', [
            'label' => 'Website',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}