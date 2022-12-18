<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * post comments likes model
 * Class Post_comments_likes
 * @package App\Models
 */
class Post_comments_likes extends Model
{
    use HasFactory;
    protected $fillable = [
        'comment_id',
        'user_id',
    ];
    //DB-relations
    public function Comment(){
        return $this->belongsTo(Post_comments::class);
    }
}
