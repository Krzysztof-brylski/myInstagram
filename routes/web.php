<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserInfoController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [WelcomeController::class,'index']);

Auth::routes();



Route::middleware('auth')->group(function (){
    Route::middleware('ExistUserInfo')->group(function (){
        Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
        Route::get('/user/search', [App\Http\Controllers\SearchController::class, 'search_user'])->name('search_user');
        Route::resource('User',UserController::class)->only('show');
        Route::post('/post', [PostController::class,'store'])->name('add_post');
        Route::get('/post/{User}', [PostController::class,'show'])->name('get_posts');
    });

    Route::resource('UserInfo', UserInfoController::class)->only(
        'create','edit','update'
    );
    Route::post('/UserInfo/{User}',[UserInfoController::class,'store'])->name('UserInfo.store');
});
