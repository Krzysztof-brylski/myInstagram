<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_comments_likes extends Model
{
    use HasFactory;
    protected $fillable = [
        'comment_id',
        'user_id',
    ];
    public function Comment(){
        return $this->belongsTo(Post_comments::class);
    }
}
