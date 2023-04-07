<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Post\FavoriteController;
use App\Http\Controllers\Post\PostController;
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
Route::get('/user', function () {
    return view('index');
});
Route::get('/post', function () {
    return view('index');
});
Route::get('/login', function () {
    return view('index');
});
Route::get('/auth/github/redirect', [LoginController::class, "handleOAuthRedirect"]);
Route::get('/auth/github/callback', [LoginController::class, "handleOAuthCallback"]);
Route::get("/auth/logout", [LogoutController::class, "logout"]);

Route::get("/auth/token", function () {
    if (Auth::check()) {
        $user = Auth::user()->select("id", "name", "img_src")->first();
        $user['isLogin'] = true;
        return $user;
    }
    return response()->json(false);
});
Route::post("/post/publish", [PostController::class, "publishNewPost"]);
Route::get("/post/home", [PostController::class, "getAllPostsDataForHome"]);
Route::delete("/post/delete/{postId}", [PostController::class, "deletePost"]);

Route::post("/favorite/{postId}", [FavoriteController::class, "registerFavorite"]);
Route::delete("/favorite/{postId}", [FavoriteController::class, "deleteFavorite"]);