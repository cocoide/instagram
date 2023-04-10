<?php

namespace App\Services\User;

use App\Repositories\User\UserRepository;
use Illuminate\Support\Facades\Auth;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function getUserDataWithPosts(int $userId)
    {
        $user = $this->userRepository->getUserDataWithPosts($userId);
        if (!$user) {
            throw new \Exception("ID: {$userId}のユーザー情報の取得中にエラーが発生");
        }
        return $user;
    }
    public function checkAuthData()
    {
        $user = $this->userRepository->getLoginUserData();
        if ($user == null) {
            return false;
        }
        return $user;
    }
}