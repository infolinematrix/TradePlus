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
                        $this->add('product_price', 'text', [
            'label' => 'Price',
            'help_block' => ['text' => ''],

            
                        'default_value' => 0.00,
            
            

        ]);
                                $this->add('product_content', 'textarea', [
            'label' => 'Content',
            'help_block' => ['text' => ''],

                        'rules' => 'required',
            
            
            

        ]);
                                $this->add('product_unit', 'select', [
            'label' => 'Unit',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_currency', 'select', [
            'label' => 'Currency',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_discount', 'text', [
            'label' => 'Discount',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_show_price', 'select', [
            'label' => 'Show Price',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_moq', 'number', [
            'label' => 'MOQ',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}