<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
 */
/**
 * Application API Route
 */
Route::group(['middleware' => 'api', 'namespace' => 'Extension\Site\Http'], function () {

    Route::get('/', function (Request $request) {
        die("Welcome, REST API");
    });

     // Contact
    Route::get('settings', 'ApiController@getSettings');
    Route::post('contact', 'ApiController@contact');

    //Settings
    Route::get('settings', 'ApiController@getSettings');
});

Route::group(['namespace' => 'ReactorCMS\Http\Controllers'], function () {

    Route::post('logout', 'Auth\LoginController@loggedOut');
    Route::get('auth/user', 'Auth\LoginController@getUser');

    Route::patch('settings/profile', 'Settings\ProfileController@update');
    Route::put('settings/password', 'Settings\PasswordController@update');
});

Route::group(['middleware' => 'api', 'namespace' => 'ReactorCMS\Http\Controllers'], function () {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('register', 'Auth\RegisterController@register');
    Route::get('register/verify/{email}', 'Auth\RegisterController@verify');

    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/forgot', 'Auth\ResetPasswordController@forgot');
    Route::post('password/reset/{email}', 'Auth\ResetPasswordController@reset');

    Route::post('oauth/{provider}', 'Auth\OAuthController@redirectToProvider');
    //Route::post('oauth/{provider}', 'Auth\OAuthController@redirect');
    Route::get('oauth/{provider}/callback', 'Auth\OAuthController@handleProviderCallback')->name('oauth.callback');
    Route::get('oauth/authorised/{params}', 'Auth\OAuthController@ProviderAuthorisation');
    //Route::get('oauth/{provider}/callback', 'Auth\OAuthController@callback')->name('oauth.callback');
});
/**
 * Payment Gateway
 */
Route::group(['middleware' => 'api', 'namespace' => 'Extension\Site\Http'], function () {

    Route::post('checkout', 'PaymentController@AuthPayment');
    Route::get('checkout/{provider}', 'PaymentController@checkout');
    Route::get('checkout/authorised/{provider}', 'PaymentController@handleProviderCallback');

    Route::get('categories/{parent?}/{limit?}', 'BusinessController@getCategories');
    Route::get('category/{id}', 'BusinessController@getCategory');
    /*Location*/
    Route::get('locations/{parent?}/{limit?}', 'BusinessController@getLocations');
    Route::get('location/{id}', 'BusinessController@getLocation');



    /*Business*/
    Route::get('get-business', 'BusinessController@getBusiness');


    Route::get('add-business', 'BusinessController@addBusiness');
    Route::post('post-business', 'BusinessController@postBusiness');
    Route::get('edit-business', 'BusinessController@editBusiness');
    Route::post('business/update', 'BusinessController@updateBusiness');

    Route::post('delete-business', 'BusinessController@destroy');
    Route::post('delete-post/{id}', 'BusinessController@deletePost');

    /*Services*/
    Route::post('post-services', 'BusinessController@postServices');
    Route::get('service/{node_id}/edit/{source_id}', 'BusinessController@editPost');
    Route::post('service/{node_id}/udpate/{source_id}', 'BusinessController@updatePost');

    /*Product*/
    Route::post('post-product', 'BusinessController@postProduct');
    Route::get('product/{node_id}/edit/{source_id}', 'BusinessController@editProduct');
    Route::post('product/{node_id}/udpate/{source_id}', 'BusinessController@updatePost');

    Route::get('all-posts', 'BusinessController@All');

    //--Products
    Route::get('get-products', 'BusinessController@getProducts');
    Route::get('get-recent-products/{limit?}', 'BusinessController@recent_products');

    //--Services
    Route::get('get-services', 'BusinessController@getServices');

    Route::post('post-quote', 'BusinessController@postquote');
    Route::post('post-enquiry', 'BusinessController@postEnquiry');

    //Promotions
    Route::get('get-promotions','BusinessController@getPromotions');
    Route::post('delete-promotion/{id}','BusinessController@deletePromotion');


    //--Browse
    Route::get('company/single/{slug}', 'BusinessController@single');
    Route::get('browse/single/{slug}', 'SearchController@single');
    Route::get('browse/{all?}', 'SearchController@browse')->where(['all' => '.*']);

    //--Reviews
    Route::get('reviews/{node_id}', 'ReviewController@reviews');
    Route::post('review/submit', 'ReviewController@store');


    Route::post('post-subscribe', 'ApiController@postSubscribe');
    Route::post('post-requirement', 'ApiController@postRequirement');
});

/**
 * Application Route
 */
Route::group(['middleware' => ['api', 'track'], 'namespace' => 'Extension\Site\Http'], function () {

    //Pages
    Route::get('pages', 'ApiController@getPages');
    Route::get('page/{slug}', 'ApiController@getPage');

    //Blogs

    Route::get('blogs', 'ApiController@getBlogs');
    Route::get('blog/{slug}', 'ApiController@getBlog');

    //Room type
    Route::get('roomtypes', 'RoomTypeController@getRoomtype');
    Route::get('room/{slug}', 'RoomTypeController@index');
    Route::post('checkavailibulity', 'RoomTypeController@checkAvailibility');

    //Route::post('checkout','RoomTypeController@checkOut');


});
