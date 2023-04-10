<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Services\Post\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }
    public function getAllPostsDataForHome()
    {
        try {
            $posts = $this->postService->getAllPosts();
            return response()->json($posts, 200);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
    public function createPost(Request $request)
    {
        try {
        $description = $request->input("description");
            $img_src = $request->input("img_src");

            $this->postService->storePost($description, $img_src);
        return response()->json("投稿を完了しました", 201);
        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode());
        }
    }

    public function deletePost($postId)
    {
        try {
            $this->postService->deletePost($postId);
        } catch (\Exception $e) {
            return response($e);
        }
    }
}