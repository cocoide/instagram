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
        $user = User::where('email', $oAtuhToken->email)
            ->first();

        if (!$user) {
            return null;
        }
        if ($user->provider !== $provider) {
            throw new \Exception('メールアドレスが他のプロバイダで既に使われてます', 401);
        }
        return $user;
    }
}