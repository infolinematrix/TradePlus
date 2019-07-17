<?php
/**
 * Created by PhpStorm.
 * User: rahul
 * Date: 1/9/17
 * Time: 5:47 PM
 */
Route::group([
    'prefix' => 'api/locations',
    'middleware' => ['api'],
    'namespace' => 'Matrix\Locations\Http',
], function () {

    Route::get('has/child/{id}', [
        'uses' => 'LocationsController@hasLocation',
    ]);
});

Route::group([
    'prefix' => 'location',
    'middleware' => ['web'],
    'namespace' => 'Matrix\Locations\Http'
], function () {


 
    Route::get('/search/{any}', [
        'uses' => 'LocationsController@searchLocation',
        'as' => 'location.search']);

});