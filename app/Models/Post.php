<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $fillable = [
        'user_id',
        'like_count',
        'content',
    ];
    public function like(){
        $this->like_count+=1;
    }
    public function Author(){
        return User::query()->where('id','=',$this->user_id)->get();
    }
    public function PostImages(){
        return $this->hasMany(Post_images::class);
    }
    public function PostComments(){
        return $this->hasMany(Post_comments::class);
    }

    use HasFactory;
}
