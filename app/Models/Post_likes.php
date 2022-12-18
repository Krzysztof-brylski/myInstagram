<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * post likes model
 * Class Post_likes
 * @package App\Models
 */
class Post_likes extends Model
{
    use HasFactory;
    protected $fillable = [
        'post_id',
        'user_id',
    ];
    //DB-relations
    public function Post(){
        return $this->belongsTo(Post::class);
    }



}
