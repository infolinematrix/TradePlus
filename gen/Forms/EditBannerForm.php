<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Forms;


use Kris\LaravelFormBuilder\Form;

class EditBannerForm extends Form {

    /**
     * Form options
     */
    protected $formOptions = [
        'method' => 'PUT'
    ];

    public function buildForm()
    {
        $this->compose('Reactor\Hierarchy\Http\Forms\NodeSourceForm');
                        $this->add('max_impression', 'number', [
            'label' => 'Max Impressions',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('web_link', 'text', [
            'label' => 'Web Link',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('show_home', 'checkbox', [
            'label' => 'Show Home',
            'help_block' => ['text' => ''],

            
            
            'choices' => ['0' => 'No' , '1' => 'Yes']

        ]);
                                $this->add('impressions', 'number', [
            'label' => 'Impressions',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}