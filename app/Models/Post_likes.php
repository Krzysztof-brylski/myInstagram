<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_likes extends Model
{
    use HasFactory;
    protected $fillable = [
        'post_id',
        'user_id',
    ];
    public function Post(){
    return $this->belongsTo(Post::class);
}
    public function isLiked(Post $post, $userId){

    }


}
