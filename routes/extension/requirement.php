<?php
/**
 * Created by PhpStorm.
 * User: rahul
 * Date: 1/1/19
 * Time: 5:51 PM
 */

/*Admin USE*/
Route::group([
    'prefix' => '/requirement',
    'middleware' => ['setTheme:' . config('themes.active_reactor'), 'web'],

], function () {

    Route::group([
        'middleware' => ['auth:admin'],

    ], function () {

        Route::get('/', [
            'uses' => '\Extension\Site\Http\Backend\PostRequirementController@index',
            'as' => 'reactor.requirement.index',
        ]);

        Route::get('/view/{id}', [
            'uses' => '\Extension\Site\Http\Backend\PostRequirementController@view',
            'as' => 'reactor.requirement.view',
        ]);

        Route::get('/status/{id}', [
            'uses' => '\Extension\Site\Http\Backend\PostRequirementController@status',
            'as' => 'reactor.requirement.status',
        ]);

        Route::get('/delete/{id}', [
            'uses' => '\Extension\Site\Http\Backend\PostRequirementController@destroy',
            'as' => 'reactor.requirement.delete',
        ]);


    });
});

