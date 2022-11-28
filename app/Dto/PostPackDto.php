<?php
namespace App\Dto;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use function Symfony\Component\String\length;

class PostPackDto{
    private $PostsPack=array();

    function pushPost($post){
        $images=$post->PostImages;
        $author=$post->Author()->all()[0];
        $images_src=array();
        $author_data=array(
            'id'=>$author->id,
            'username'=>$author->username,
            'image'=>$author->Info->photo,
        );
        foreach ($images->all() as $img){
            array_push($images_src,$img->image_url);
        }
        $this->PostsPack[$post->id]=[
            'post_id'=>$post->id,
            'author'=>$author_data,
            'content'=> $post->content,
            'like_count'=> $post->like_count,
            'liked'=>$post->isUserLiked(Auth::user()->id),
            'images'=> $images_src,
        ];
    }


    function build(User $User){
        $table_name="user_follows_".$User->username;
        $ids=DB::table($table_name)->get();
        foreach($ids as $id){
            $posts=Post::query()->where('user_id','=',$id->user_id)->get()->all();
            foreach($posts as $post){
                $this->pushPost($post);
            }

        }
        $len=count($this->PostsPack);
       if($len < 20){
           $posts=Post::query()->orderBy('like_count','DESC')->limit(20-$len)->get()->all();
           foreach($posts as $post){
               if(!in_array($post,$this->getPostPac())){
                   $this->pushPost($post);
               }
           }
       }
        //get followed_acc arr
        //get post from followed arr

    } //build into working on front-end assoc arr


    function isEmpty(){
        return empty($this->Posts);
    }

    function getPostPac(){
        return $this->PostsPack;
    }

}
