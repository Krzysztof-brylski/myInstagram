<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Post_comments model
 * Class Post_comments
 * @package App\Models
 */
class Post_comments extends Model
{
    protected $fillable = [
        'post_id',
        'user_id',
        'like_count',
        'content',
    ];
    /**
     * increment comment like count
     */
    public function like(){
        $this->like_count+=1;
    }
    /**
     * decrement comment like count
     */
    public function disLike(){
        $this->like_count-=1;
    }
    /**
     * return list of users with liked this comment
     * @return array
     */
    public function listOfLikes(){
        $listOfLikes=array();
        foreach ($this->CommentLikes as $like){
            array_push($listOfLikes,$like->user_id);
        }
        return $listOfLikes;
    }
    /**
     * check if specified user liked this comment
     * @param $id
     * @return bool
     */
    public function isUserLiked($id){
        return in_array($id,$this->listOfLikes());
    }
    /**
     * return comment author
     */
    public function Author(){
        return User::query()->where('id','=',$this->user_id)->get();
    }
    // DB-relations
    public function Post(){
        return $this->belongsTo(Post::class);
    }
    public function CommentLikes(){
        return $this->hasMany(Post_comments_likes::class);
    }
    use HasFactory;
}
