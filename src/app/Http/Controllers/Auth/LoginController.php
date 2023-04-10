<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\LoginService;

class LoginController extends Controller
{
    protected $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }
    public function handleOAuthRedirect(string $provider)
    {
        try {
            return $this->loginService->redirectToOAuth($provider);
        } catch (\Exception $e) {
            return redirect("/login")->withErrors($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function handleOAuthCallback(string $provider)
    {
        try {
            $this->loginService->loginOrSignupByOAuth($provider);
        } catch (\Exception $e) {
            return redirect("/login")->withErrors($e->getMessage(), $e->getCode() ?: 500);
        }
        return redirect("/home");
    }
}