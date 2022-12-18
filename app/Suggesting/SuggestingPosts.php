<?php
namespace App\Suggesting;
use App\Dto\post\postDto;
use App\Dto\post\postImagesDto;
use App\Dto\post\PostPackDto;
use App\Dto\user\userDto;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * Class SuggestingPosts
 * @package App\Suggesting
 */
class SuggestingPosts{
    //array of postDto for suggested posts
    private $postsArray=array();
    //count of posts in one page
    private $pageSize;

    /**
     * SuggestingPosts constructor.
     * @param $pageSize
     */
    public function __construct( $pageSize){
        $this->pageSize=$pageSize;
    }

    /**
    * mapping Post model into postDto
    * @param Post $post
    * @return postDto
    */
    private function buildPost(Post $post){

        $images=$post->PostImages;
        $author=$post->Author()->all()[0];
        $imagesDto=new postImagesDto($images->all());
        $userDto= new userDto($author);
        return new postDto($userDto,$imagesDto,$post);
    }

    /**
     * building array of postDto with suggested posts,
     * by getting all followed users posts and combining them with some most popular posts
     * @param User $User
     */
    public function build(User $User){
        $table_name="user_follows_".$User->id;
        $maxSize=10 * $this->pageSize;
        $ids=DB::table($table_name)->get();
        foreach($ids as $id){
            $posts=Post::query()->where('user_id','=',$id->user_id)->orderBy('like_count','DESC')->get()->all();
            foreach($posts as $post){
                $postDto=$this->buildPost($post);
                if(!in_array($postDto,$this->postsArray)){
                    array_push($this->postsArray,$postDto);
                }
            }
        }
        $len=count($this->postsArray);
        if($len < $maxSize){
            $posts=Post::query()->orderBy('like_count','DESC')->limit($maxSize-$len)->get()->all();
            foreach($posts as $post){
                $postDto=$this->buildPost($post);
                if(!in_array($postDto,$this->postsArray)){
                    array_push($this->postsArray,$postDto);
                }
            }
        }
    }

    /**
     * return how many pages can be use in pagination
     * @return int
     */
    function getPagesCount(){
        return ceil(count($this->postsArray)/10);
    }

    /**
     * returning PostPackDto with suggested posts, and all necessary information
     * @param int $page
     * @return PostPackDto
     */
    function getPostPac($page=0){
        $offset=($page-1)*$this->pageSize;
        return new PostPackDto(array_slice($this->postsArray, $offset, $this->pageSize),$this->pageSize,$this->getPagesCount());
    }

}
