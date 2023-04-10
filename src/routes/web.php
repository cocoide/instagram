<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\User\FavoriteController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', function () {
    return view('index');
});
Route::get('/user/{id}', function () {
    return view('index');
});
Route::get('/post', function () {
    return view('index');
});
Route::get('/login', function () {
    return view('index');
});
Route::get('/favorite/{id}', function () {
    return view('index');
});
Route::get('/auth/{provider}/redirect', [LoginController::class, "handleOAuthRedirect"]);
Route::get('/auth/{provider}/callback', [LoginController::class, "handleOAuthCallback"]);
Route::get("/auth/logout", [LogoutController::class, "handleLogout"]);

Route::get("/auth/token", function () {
    if (Auth::check()) {
        $user = Auth::user()->select("id", "name", "img_src")->first();
        $user['isLogin'] = true;
        return $user;
    }
    return response()->json(false);
});
Route::post("/post/publish", [PostController::class, "createPost"]);
Route::get("/post/home", [PostController::class, "getAllPostsDataForHome"]);
Route::delete("/post/delete/{postId}", [PostController::class, "deletePost"]);

Route::post("/favorite/{postId}", [FavoriteController::class, "registerFavorite"]);
Route::delete("/favorite/{postId}", [FavoriteController::class, "deleteFavorite"]);
Route::get("/user/{userId}/post", [UserController::class, "getUserDataWithPosts"]);
Route::get("/favorite/{postId}", [FavoriteController::class, "getUsersWhoLiked"]);