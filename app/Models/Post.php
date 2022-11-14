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
    public function disLike(){
        $this->like_count-=1;
    }
    public function listOfLikes(){
        $listOfLikes=array();
        foreach ($this->PostLikes as $like){
            array_push($listOfLikes,$like->user_id);
        }
        return $listOfLikes;
    }
    public function isUserLiked($id){
        return in_array($id,$this->listOfLikes());
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
    public function PostLikes(){
        return $this->hasMany(Post_likes::class);
    }

    use HasFactory;
}
