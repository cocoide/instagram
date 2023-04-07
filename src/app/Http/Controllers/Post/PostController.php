<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function getAllPostsDataForHome()
    {
        return Post::with([
            'author',
            'favorites' => function ($query) {
                $query->select('user_id');
            }
        ])
            ->orderBy('created_at', 'desc')
            ->paginate(5);
    }

    public function publishNewPost(Request $request)
    {
        $description = $request->input("description");
        $img_src = $request->input("img_src");
        $author_id = Auth::user()->id;

        $post = new Post();
        $post->description = $description;
        $post->img_src = $img_src;
        $post->author_id = $author_id;
        $post->save();
        return response()->json("投稿を完了しました", 201);
    }

    public function deletePost($postId)
    {
        $post = Post::find($postId);
        $post->delete();
        return response()->json("投稿の削除を完了", 201);
    }
}