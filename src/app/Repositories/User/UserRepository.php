<?php

namespace App\Repositories\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository
{
    public function getUserDataWithPosts(int $userId)
    {
        return User::with([
            'posts' => function ($query) {
                $query->orderBy('created_at', 'desc')->select('id', 'img_src', 'author_id');
            },
            'favorites' => function ($query) use ($userId) {
                $query->where('user_id', $userId)->select('post_id');
            },
        ])
            ->select('id', 'name', 'img_src')
            ->find($userId);
    }
    public function getLoginUserData()
    {
        if (!Auth::check()) {
            return false;
        }
        $user = Auth::user()->select("id", "name", "img_src")->first();
        $user['isLogin'] = true;
        return $user;
    }
}