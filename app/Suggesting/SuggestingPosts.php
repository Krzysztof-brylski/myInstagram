<?php
namespace App\Suggesting;
use App\Dto\post\postDto;
use App\Dto\post\postImagesDto;
use App\Dto\post\PostPackDto;
use App\Dto\user\userDto;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class SuggestingPosts{
    private $postsArray=array();
    private $maxPages;
    private $pageSize;
    public function __construct($maxPages, $pageSize){
        $this->maxPages=$maxPages;
        $this->pageSize=$pageSize;
    }
    private function buildPost(Post $post){

        $images=$post->PostImages;
        $author=$post->Author()->all()[0];
        $imagesDto=new postImagesDto($images->all());
        $userDto= new userDto($author);
        return new postDto($userDto,$imagesDto,$post);
    }
    public function build(User $User){
        $table_name="user_follows_".$User->username;
        $maxSize=$this->maxPages * $this->pageSize;
        $ids=DB::table($table_name)->get();
        foreach($ids as $id){
            $posts=Post::query()->where('user_id','=',$id->user_id)->orderBy('like_count','DESC')->get()->all();
            foreach($posts as $post){
                array_push($this->postsArray,$this->buildPost($post));
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

    function getPagesCount(){
        return ceil(count($this->postsArray)/10);
    }

    function getPostPac($page=0){
        $offset=($page-1)*$this->pageSize;
        return new PostPackDto(array_slice($this->postsArray, $offset, $this->pageSize),$this->pageSize,$this->getPagesCount());
    }

}
