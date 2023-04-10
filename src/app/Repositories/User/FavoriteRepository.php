<?php

namespace App\Repositories\User;

use App\Models\Favorite;
use App\Models\User;

class FavoriteRepository
{
    public function registerFavorite($postId, $userId): Favorite
    {
        $favorite = new Favorite();
        $favorite->user_id = $userId;
        $favorite->post_id = $postId;
        $favorite->save();
        return $favorite;
    }
    public function findFavorite($postId, $userId)
    {
        return Favorite::where('user_id', $userId)->where('post_id', $postId)->first();
    }
    public function getUsersWhoLiked($postId)
    {
        return User::whereHas('favorites', function ($query) use ($postId) {
            $query->where('post_id', $postId);
        })
            ->select('id', 'name', 'img_src')
            ->get();
    }
}