<?php
namespace App\Dto\comment;

use App\Models\Post_comments;
use Illuminate\Support\Facades\Auth;

class commentContentDto{
    public $id;
    public $content;
    public $liked;
    public $like_count;

    public function __construct(Post_comments $post_comments){
        $this->id=$post_comments->id;
        $this->content=$post_comments->content;
        $this->liked=$post_comments->isUserLiked(Auth::user()->id);
        $this->like_count=$post_comments->like_count;
    }


}
