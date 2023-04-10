<?php

namespace App\Repositories\Post;

use App\Models\Post;


class PostRepository
{
    public function getAllPostsByPagination(int $pageLimit)
    {
        return Post::with([
            'author',
            'favorites' => function ($query) {
                $query->select('user_id');
            }
        ])
            ->orderBy('created_at', 'desc')->paginate($pageLimit);
    }
    public function storePost($description, $img_src, $author_id)
    {
        $post = new Post();
        $post->description = $description;
        $post->img_src = $img_src;
        $post->author_id = $author_id;
        $post->save();
    }

    public function findPost($postId)
    {
        return Post::find($postId);
    }
}