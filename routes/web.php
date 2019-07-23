<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

require 'common.php';
require 'auth.php';

Route::group([
    'namespace' => '\ReactorCMS\Http\Controllers',
], function () {
    require routes_path('reactor.php');
});

Route::group(['namespace' => '\Extension\Site\Http'], function () {
    // Web Route
    Route::get('/', [
        'as' => 'site.home',
        'uses' => 'SiteController@getHome',
    ]);


});

Route::group(['middleware' => ['auth:admin', 'can:ACCESS_REACTOR'], 'namespace' => '\Extension\Site\Http'], function () {

    Route::get('/import/location', [
        'as' => 'site.home',
        'uses' => 'ImportController@location',
    ]);
});
/*Route::get('{path}', function () {
return file_get_contents(public_path('_nuxt/index.html'));
})->where('path', '(.*)');
 */
