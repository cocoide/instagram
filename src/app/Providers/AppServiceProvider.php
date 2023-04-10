<?php

namespace App\Providers;

use App\Http\Controllers\User\UserController;
use App\Repositories\User\UserRepository;
use App\Services\User\UserService;
use Illuminate\Support\ServiceProvider;

use App\Repositories\Auth\LoginRepository;
use App\Services\Auth\LoginService;
use App\Http\Controllers\Auth\LoginController;

use App\Repositories\Post\PostRepository;
use App\Services\Post\PostService;
use App\Http\Controllers\Post\PostController;

use App\Repositories\User\FavoriteRepository;
use App\Services\User\FavoriteService;
use App\Http\Controllers\User\FavoriteController;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(LoginRepository::class, function ($app) {
            return new LoginRepository();
        });
        $this->app->bind(LoginService::class, function ($app) {
            $repository = $app->make(LoginRepository::class);
            return new LoginService($repository);
        });
        $this->app->bind(LoginController::class, function ($app) {
            $service = $app->make(LoginService::class);
            return new LoginController($service);
        });


        $this->app->bind(PostReposiotry::class, function ($app) {
            return new PostRepository();
        });
        $this->app->bind(PostService::class, function ($app) {
            $repository = $app->make(PostRepository::class);
            return new PostService($repository);
        });
        $this->app->bind(PostController::class, function ($app) {
            $repository = $app->make(PostService::class);
            return new PostController($repository);
        });


        $this->app->bind(FavoriteRepository::class, function ($app) {
            return new FavoriteRepository();
        });
        $this->app->bind(FavoriteService::class, function ($app) {
            $repository = $app->make(FavoriteRepository::class);
            return new FavoriteService($repository);
        });
        $this->app->bind(FavoriteController::class, function ($app) {
            $service = $app->make(FavoriteService::class);
            return new FavoriteController($service);
        });


        $this->app->bind(UserRepository::class, function ($app) {
            return new UserRepository();
        });
        $this->app->bind(UserService::class, function ($app) {
            $repository = $app->make(UserRepository::class);
            return new UserService($repository);
        });
        $this->app->bind(UserController::class, function ($app) {
            $service = $app->make(UserService::class);
            return new UserController($service);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
