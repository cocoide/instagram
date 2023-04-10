<?php

namespace App\Services\User;

use App\Repositories\User\FavoriteRepository;
use Auth;

class FavoriteService
{
    protected $favoriteRepository;

    public function __construct(FavoriteRepository $favoriteRepository)
    {
        $this->favoriteRepository = $favoriteRepository;
    }
    public function registerFavorite($postId)
    {
        if (!Auth::check()) {
            throw new \Exception("ログインして下さい", 401);
        }
        $userId = Auth::user()->id;
        $favorite = $this->favoriteRepository->findFavorite($postId, $userId);
        if ($favorite) {
            throw new \Exception("すでにいいねされてます");
        }
        $favorite = $this->favoriteRepository->registerFavorite($postId, $userId);
        if (!$favorite) {
            throw new \Exception("いいねの保存中にエラーが発生");
        }
    }
    public function cancelFavorite($postId)
    {
        if (!Auth::check()) {
            new \Exception("ログインして下さい", 401);
        }
        $userId = Auth::user()->id;
        $favorite = $this->favoriteRepository->findFavorite($postId, $userId);
        if (!$favorite) {
            throw new \Exception("まだいいねされてません", 404);
        }
        return $favorite->delete();
    }
    public function getUsersWhoLiked($postId)
    {
        $users = $this->favoriteRepository->getUsersWhoLiked($postId);
        if (!$users) {
            throw new \Exception("ユーザー情報取得中にエラーが発生");
        }
        return $users;
    }

}