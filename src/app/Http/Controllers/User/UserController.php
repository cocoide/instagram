<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function getUserDataWithPosts(string $userId)
    {
        try {
            $user = $this->userService->getUserDataWithPosts($userId);
            return response()->json($user);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
    public function getAuthToken()
    {
        try {
            $userDataOrFalse = $this->userService->checkAuthData();
            return response()->json($userDataOrFalse);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}