<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post_images extends Model
{
    protected $fillable = [
        'post_id',
        'image_url',
    ];
    public function Post(){
        return $this->belongsTo(Post::class);
    }
    use HasFactory;
}
