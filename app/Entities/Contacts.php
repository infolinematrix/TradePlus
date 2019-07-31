<?php

namespace ReactorCMS\Entities;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{

    //
    protected $table = 'contacts';
    protected $fillable = ['prefix', 'name', 'email', 'phone', 'content', 'status'];
}
