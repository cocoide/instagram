<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function handleOAuthRedirect()
    {
        return Socialite::driver("github")->redirect();
    }
    public function handleOAuthCallback()
    {
        $oAuthToken = Socialite::driver("github")->user();
        $existUser = $this->findByOAuthToken($oAuthToken);
        if ($existUser) {
            Auth::login($existUser);
            return redirect("/home");
        }
        $newUser = User::query()->updateOrCreate(
            [
                'provider_id' => $oAuthToken->id,
                'provider' => "github",
            ],
            // 以下のカラムはアカウント作成後更新されない
            [
                'email' => $oAuthToken->email,
                'name' => $oAuthToken->nickname,
                'img_src' => $oAuthToken->avatar,
            ],
        );
        Auth::login($newUser);
        return redirect("/home");
    }

    private function findByOAuthToken($oAtuhToken)
    {
        return User::where("provider", "github")
            ->where("email", $oAtuhToken->email)
            ->first();
    }
}