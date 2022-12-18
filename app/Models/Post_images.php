<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * post images model
 * Class Post_images
 * @package App\Models
 */
class Post_images extends Model
{
    protected $fillable = [
        'post_id',
        'image_url',
    ];
    //DB-relations
    public function Post(){
        return $this->belongsTo(Post::class);
    }
    use HasFactory;
}
