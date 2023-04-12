<?php

namespace App\Repositories\Auth;

use App\Models\User;

class LoginRepository
{
    public function updateOrCreateUserByOAuth(string $provider, $oAtuhCallbackToken)
    {
        return User::query()->updateOrCreate(
            [
                'provider_id' => $oAtuhCallbackToken->id,
                'provider' => $provider,
            ],
            [
                'name' => $oAtuhCallbackToken->nickname,
                'email' => $oAtuhCallbackToken->email,
                'img_src' => $oAtuhCallbackToken->avatar,
            ],
        );
    }

    public function findUserByOAuth(string $provider, $oAtuhToken)
    {
        return User::where('email', $oAtuhToken->email)
            ->first();
    }
}