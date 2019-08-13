<?php
/**
 * Created by PhpStorm.
 * User: rahul
 * Date: 1/1/19
 * Time: 5:51 PM
 */

/*Admin USE*/
Route::group([
    'prefix' => '/reviews',
    'middleware' => ['setTheme:' . config('themes.active_reactor'), 'web'],

], function () {

    Route::group([
        'middleware' => ['auth:admin'],

    ], function () {

        Route::get('/', [
            'uses' => '\Extension\Site\Http\Backend\ReviewsController@index',
            'as' => 'reactor.reviews.index',
        ]);

        Route::get('/view/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ReviewsController@view',
            'as' => 'reactor.reviews.view',
        ]);

        Route::get('/status/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ReviewsController@status',
            'as' => 'reactor.reviews.status',
        ]);

        Route::get('/delete/{id}', [
            'uses' => '\Extension\Site\Http\Backend\ReviewsController@destroy',
            'as' => 'reactor.reviews.delete',
        ]);


    });
});

