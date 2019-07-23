<?php
/**
 * Created by PhpStorm.
 * User: rahul
 * Date: 1/1/19
 * Time: 5:51 PM
 */

/*Admin USE*/
Route::group([
    'prefix' => '/business',
    'middleware' => ['setTheme:' . config('themes.active_reactor'), 'web'],

], function () {

    Route::group([
        'middleware' => ['auth:admin'],

    ], function () {

        Route::get('/', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@index',
            'as' => 'reactor.business.index',
        ]);

        Route::get('/import', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@import',
            'as' => 'reactor.business.import',
        ]);

        Route::post('/import', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@import_store',
            'as' => 'reactor.business.import',
        ]);

        Route::get('/create', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@create',
            'as' => 'reactor.business.create',
        ]);

        Route::post('/create', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@store',
            'as' => 'reactor.business.create',
        ]);

        Route::get('{id}/edit/{source?}', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@edit',
            'as' => 'reactor.business.edit',
        ]);

        Route::put('{id}/edit/{source?}', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@update',
            'as' => 'reactor.business.edit',
        ]);

        Route::get('/photo/{id}', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@getPhoto',
            'as' => 'reactor.business.photo',
        ]);

        Route::post('/upload/photo', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@updatePhoto',
            'as' => 'reactor.business.upload.photo',
        ]);

        Route::delete('/delete/{id}', [
            'uses' => '\Extension\Site\Http\Backend\BusinessController@destroy',
            'as' => 'reactor.business.destroy']);

        /*Service*/

        Route::get('/services/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@index',
            'as' => 'reactor.business.service',
        ]);

        Route::get('/post-service/create/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@create',
            'as' => 'reactor.business.service.create',
        ]);

        Route::post('/post-service/create/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@store',
            'as' => 'reactor.business.service.create',
        ]);

        Route::get('{id}/service/edit/{source?}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@edit',
            'as' => 'reactor.business.service.edit',
        ]);

        Route::put('{id}/service/edit/{source?}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@update',
            'as' => 'reactor.business.service.edit',
        ]);

        Route::get('/services/import/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@import',
            'as' => 'reactor.business.service.import',
        ]);

        Route::post('/services/import/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@import_store',
            'as' => 'reactor.business.service.import',
        ]);

        Route::delete('/service/delete/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ServiceController@destroy',
            'as' => 'reactor.business.service.destroy']);


        /*Product*/

        Route::get('/product/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@index',
            'as' => 'reactor.business.product',
        ]);

        Route::get('/post-product/create/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@create',
            'as' => 'reactor.business.product.create',
        ]);

        Route::post('/post-product/create/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@store',
            'as' => 'reactor.business.product.create',
        ]);

        Route::get('{id}/product/edit/{source?}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@edit',
            'as' => 'reactor.business.product.edit',
        ]);

        Route::put('{id}/product/edit/{source?}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@update',
            'as' => 'reactor.business.product.edit',
        ]);

        Route::get('/product/import/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@import',
            'as' => 'reactor.business.product.import',
        ]);

        Route::post('/product/import/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@import_store',
            'as' => 'reactor.business.product.import',
        ]);

        Route::delete('/product/delete/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ProductController@destroy',
            'as' => 'reactor.business.product.destroy']);


    });
});

