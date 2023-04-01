<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
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
Route::get('/oauth/github/redirect', [LoginController::class, "handleOAuthRedirect"]);
Route::get('/oauth/github/callback', [LoginController::class, "handleOAuthCallback"]);
Route::get("/auth/logout", [LogoutController::class, "logout"]);

Route::get("/token", function () {
    $user = Auth::user();
    if ($user) {
        return $user;
    }
    return response()->json([], 401);
});