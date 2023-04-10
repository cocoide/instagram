<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\FavoriteService;

class FavoriteController extends Controller
{
    protected $favoriteService;

    public function __construct(FavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }
    public function registerFavorite(int $postId)
    {
        try {
            $this->favoriteService->registerFavorite($postId);
            return response()->json("いいねを登録しました", 200);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
    public function deleteFavorite(int $postId)
    {
        try {
            $this->favoriteService->cancelFavorite($postId);
            return response()->json("いいねを解除しました", 200);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function getUsersWhoLiked($postId)
    {
        try {
            $users = $this->favoriteService->getUsersWhoLiked($postId);
            return response()->json($users);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}