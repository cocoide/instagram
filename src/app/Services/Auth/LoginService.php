<?php

namespace App\Services\Auth;

use App\Repositories\Auth\LoginRepository;
use Auth;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LoginService
{
    protected $loginRepository;

    public function __construct(LoginRepository $loginRepository)
    {
        $this->loginRepository = $loginRepository;
    }


    public function getOAuthCallbackToken($provider)
    {
        return Socialite::driver($provider)->user();
    }

    public function redirectToOAuth($provider): RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    public function loginOrSignupByOAuth(string $provider)
    {
        $oAtuhToken = $this->getOAuthCallbackToken($provider);
        if (!$oAtuhToken) {
            throw new \Exception("OAuthのアクセストークン取得中にエラーが発生", 401);
        }
        $existUser = $this->loginRepository->findUserByOAuth($provider, $oAtuhToken);
        if ($existUser->provider !== $provider) {
            throw new \Exception('メールアドレスが他のプロバイダで既に使われてます', 401);
        }
        if ($existUser) {
            return Auth::login($existUser);
        }
        $newUser = $this->loginRepository->updateOrCreateUserByOAuth($provider, $oAtuhToken);
        if (!$newUser) {
            throw new \Exception("ユーザーの登録中にエラーが発生");
        }
        return Auth::login($newUser);
    }
}