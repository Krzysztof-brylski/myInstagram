<?php

use App\Http\Controllers\PostCommentsController as PostCommentsControllerAlias;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserInfoController;
use App\Http\Controllers\WelcomeController;
use App\Models\Post_comments;
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
        Route::post('/user/follow/{User}',[UserController::class,'follow']);
        Route::get('/home/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
        Route::get('/user/search/', [App\Http\Controllers\SearchController::class, 'search_user'])->name('search_user');
        Route::get('/user/edit/{User}', [UserController::class, 'edit'])->name('user_edit');
        Route::post('/user/edit/', [UserController::class, 'update'])->name('user_edit_save');
        Route::post('/user/image/edit/', [UserController::class, 'updateImage'])->name('user_edit_image');
        Route::post('/user/image/delete/', [UserController::class, 'deleteImage'])->name('user_image_delete');
        Route::get('/user/suggestedFollows/', [UserController::class, 'showSuggestedUsers'])->name('user_suggested_follows');
        Route::resource('User',UserController::class)->only(['show']);
        Route::post('/post/', [PostController::class,'store'])->name('add_post');
        Route::post('/post/{Post}', [PostController::class,'like'])->name('like_post');
        Route::get('/post/likes/{Post}', [PostController::class,'likeCount'])->name('likeCount_post');
        Route::get('/post/{User}', [PostController::class,'show'])->name('get_posts');
        Route::post('/delete/post/', [PostController::class,'delete']);
        Route::get('/proposing/', [PostController::class,'suggestedPosts']);
        Route::get('/post/count/{User}', [PostController::class,'postCount']);
        Route::get('/post/comments/{Post}', [PostCommentsControllerAlias::class,'getComments']);
        Route::post('/addPostComment/', [PostCommentsControllerAlias::class,'comment']);
        Route::get('/post/comments/likes/{Post_comments}', [PostCommentsControllerAlias::class,'likeCount']);
        Route::post('/post/comments/likes/{Post_comments}', [PostCommentsControllerAlias::class,'likeComment']);
    });

    Route::resource('UserInfo', UserInfoController::class)->only(
        'create','edit','update'
    );
    Route::post('/UserInfo/{User}',[UserInfoController::class,'store'])->name('UserInfo.store');
});
