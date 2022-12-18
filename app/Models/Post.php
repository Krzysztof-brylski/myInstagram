<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Post model
 * Class Post
 * @package App\Models
 */
class Post extends Model
{

    protected $fillable = [
        'user_id',
        'like_count',
        'content',
    ];

    /**
     * increment post like count
     */
    public function like(){
        $this->like_count+=1;
    }
    /**
     * decrement post like count
     */
    public function disLike(){
        $this->like_count-=1;
    }

    /**
     * return list of users with liked this post
     * @return array
     */
    public function listOfLikes(){
        $listOfLikes=array();
        foreach ($this->PostLikes as $like){
            array_push($listOfLikes,$like->user_id);
        }
        return $listOfLikes;
    }

    /**
     * check if specified user liked this post
     * @param $id
     * @return bool
     */
    public function isUserLiked($id){
        return in_array($id,$this->listOfLikes());
    }
    /**
     * return post author
     */
    public function Author(){
        return User::query()->where('id','=',$this->user_id)->get();
    }

    // DB-relations
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
