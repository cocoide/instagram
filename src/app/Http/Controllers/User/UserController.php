<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function getUserDataWithPosts($userId)
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
}