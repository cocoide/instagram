<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout()
    {
        Auth::logout();
        if (!Auth::check()) {
            return response()->json("Logout succeded", 200);
        }
        response()->json("Logout failed", 400);
    }
}