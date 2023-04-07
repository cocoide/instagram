<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id')
            ->select('name', 'id', 'img_src');
    }
    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites', 'post_id', 'user_id');
    }
    protected $fillable = [
        'id',
        'author_id',
        'img_src',
        'description',
    ];

}