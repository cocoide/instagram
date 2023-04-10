<?php

namespace App\Services\Post;

use App\Repositories\Post\PostRepository;
use Illuminate\Support\Facades\Auth;

class PostService
{
    protected $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function getAllPosts()
    {
        return $this->postRepository->getAllPostsByPagination(5);
    }
    public function storePost($description, $img_src)
    {
        if (!Auth::check()) {
            throw new \Exception("ログインしてください", 401);
        }
        $userId = Auth::user()->id;
        $this->postRepository->storePost($description, $img_src, $userId);
    }
    public function deletePost($postId)
    {
        $post = $this->postRepository->findPost($postId);
        if ($post) {
            return $post->delete();
        }
        throw new \Exception("ID:{$postId} の投稿は見つかりませんでした", 402);
    }
}