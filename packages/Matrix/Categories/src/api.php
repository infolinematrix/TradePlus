<?php
use Illuminate\Support\Facades\Route;

/**
 * Created by PhpStorm.
 * User: rahul
 * Date: 1/9/17
 * Time: 5:47 PM
 */
Route::group([
    'prefix' => 'api/categories',
    'middleware' => ['api'],
    'namespace' => 'Matrix\Categories\Http',
], function () {

    Route::get('parent/{id?}', [
        'uses' => 'CategoriesController@getCategoriesList',
    ]);

    Route::get('has/child/{id}', [
        'uses' => 'CategoriesController@hasCategory',
    ]);

});

Route::group([
    'prefix' => 'category',
    'middleware' => ['web'],
    'namespace' => 'Matrix\Categories\Http',
], function () {

    /* Route::get('/api/{id?}', [
'uses' => 'CategoriesController@getCategoryapi',
'as' => 'category.api']);
 */

});
