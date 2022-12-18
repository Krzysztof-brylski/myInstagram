<?php
namespace App\Dto\post;
use App\Dto\user\userDto;
use App\Dto\post\postImagesDto;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

/**
 * Class postDto
 * DTO for post
 * @package App\Dto\post
 */
class postDto{

    public $post_id;
    public $author;
    public $content;
    public $like_count;
    public $liked;
    public $images;

    /**
     * postDto constructor.
     * @param userDto $userDto
     * @param postImagesDto $postImagesDto
     * @param Post $post
     */

    public function __construct(userDto $userDto,postImagesDto $postImagesDto,Post $post){
        $this->author=$userDto;
        $this->images=$postImagesDto->images;
        $this->post_id=$post->id;
        $this->content=$post->content;
        $this->like_count=$post->like_count;
        $this->liked=$post->isUserLiked(Auth::user()->id);
    }


}
