<?php

namespace App\Http\Controllers\Post;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function registerFavorite($postId)
    {
        try {
            $userId = auth()->user()->id;

            $favorite = Favorite::where('user_id', $userId)->where('post_id', $postId)->first();
            if ($favorite) {
                throw new \Exception("すでにいいねされてあります", 404);
            }
            $favorite = new Favorite();
            $favorite->user_id = $userId;
            $favorite->post_id = $postId;
            $favorite->save();
            return response()->json("いいねを登録しました", 200);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
    public function deleteFavorite($postId)
    {
        try {
            $userId = auth()->user()->id;

            $favorite = Favorite::where('user_id', $userId)->where('post_id', $postId)->first();
            if (!$favorite) {
                throw new \Exception("まだいいねされてません", 404);
            }
            $favorite->delete();
            return response()->json("いいねを解除しました", 200);

        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
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