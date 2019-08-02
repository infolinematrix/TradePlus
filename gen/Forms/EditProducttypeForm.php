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
                        $this->add('emailenquiry', 'text', [
            'label' => 'Email Enquiry',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('phonemessage', 'text', [
            'label' => 'Phone/SMS Message',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('description', 'wysiwyg', [
            'label' => 'Product Description',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_price', 'text', [
            'label' => 'Price',
            'help_block' => ['text' => ''],

            
                        'default_value' => 0.00,
            
            

        ]);
                                $this->add('show_price', 'text', [
            'label' => 'Show Price',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_unit', 'text', [
            'label' => 'Unit',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('product_moq', 'number', [
            'label' => 'MOQ',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                                $this->add('shipping', 'text', [
            'label' => 'International Shipping',
            'help_block' => ['text' => ''],

            
            
            

        ]);
                    }

}