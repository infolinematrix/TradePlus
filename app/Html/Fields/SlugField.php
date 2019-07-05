<?php

namespace ReactorCMS\Html\Fields;


use Kris\LaravelFormBuilder\Fields\FormField;

class SlugField extends FormField {

    /**
     * Get the template, can be config variable or view path
     *
     * @return string
     */
    protected function getTemplate()
    {
        return 'fields.slug';
    }

}