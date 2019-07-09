<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditBusinessForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('business_address', 'text', [
            'label' => 'Address',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_email', 'text', [
            'label' => 'Email',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_website', 'text', [
            'label' => 'Website',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_phone', 'text', [
            'label' => 'Phone',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_facebook', 'text', [
            'label' => 'Facebook',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_twitter', 'text', [
            'label' => 'Twitter',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_linkedin', 'text', [
            'label' => 'Linkedin',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_youtube', 'text', [
            'label' => 'Youtube',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_google', 'text', [
            'label' => 'Google',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_employee', 'number', [
            'label' => 'No of Employee',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_scale', 'select', [
            'label' => 'Scale',
            'help_block' => ['text' => ''],

            
            
            'choices' => ['1' => 'Large Scale' , '2' => 'Medium Scale' , '3' => 'Small Scale']

        ]);
                                $this->add('business_entity', 'select', [
            'label' => 'Entity',
            'help_block' => ['text' => ''],

            
            
            'choices' => ['1' => 'Private Limited' , '2' => 'Public Limited' , '3' => 'Partnership' , '4' => 'Proprietorship' , '5' => 'Chartered Company' , '6' => 'Statutory Company' , '7' => 'Holding Company' , '8' => 'Subsidiary Company' , '9' => 'Non Government Organization (NGO)' , '99' => 'Not Classified' ]

        ]);
                                $this->add('business_established', 'text', [
            'label' => 'Established (Year/Month)',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_long', 'double', [
            'label' => 'Longitude',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_lat', 'double', [
            'label' => 'Latitude',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_zipcode', 'text', [
            'label' => 'Zip Code',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('business_description', 'wysiwyg', [
            'label' => 'Description',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('payment_accept', 'text', [
            'label' => 'Payment Accept',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}