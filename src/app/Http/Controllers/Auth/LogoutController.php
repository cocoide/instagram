<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function handleLogout()
    {
        Auth::logout();
        if (Auth::check()) {
            return redirect("/home")->withErrors("ログアウトに失敗", 500);
        }
        return redirect("/login")->withErrors("ログアウトに成功", 200);
    }
}