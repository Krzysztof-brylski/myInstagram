<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_comments extends Model
{
    protected $fillable = [
        'post_id',
        'user_id',
        'like_count',
        'content',
    ];
    public function Author(){
        return $this->hasOne(User::class);
    }
    public function Post(){
        return $this->belongsTo(Post::class);
    }
    use HasFactory;
}
