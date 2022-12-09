<?php

namespace App\Http\Controllers;
use App\Models\Post;
use App\Models\Post_images;
use App\Models\Post_likes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Dto\PostPackDto;
use App\Dto\user\userDto;
use App\Dto\post\postDto;
use App\Dto\post\postImagesDto;
use App\ValueObjects\postsContainerVo;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    private $proposing;

    public function __construct(){
        $this->proposing= new PostPackDto();
    }

    public function show(User $User){
        if(!$User->exists){
            return Response()->json("Error",400);
        }
        $posts=Post::query()->where('user_id','=',$User->id)->get()->all();
        $postDtos=array();
        foreach ($posts as $post){
            $images=$post->PostImages;
            $author=$post->Author()->all()[0];
            $imagesDto=new postImagesDto($images->all());
            $userDto= new userDto($author);
            $postDto = new postDto($userDto,$imagesDto,$post);
            array_push($postDtos,$postDto);
        }
        $postsContainer=new postsContainerVo($postDtos);
        return Response()->json($postsContainer->getReverse(),200);
    }

    public function proposedPosts(Request $request){
        $this->proposing->build(Auth::user());
        if($request->has("page")){
            $page=$request->page;

            $response=$this->proposing->getPostPac($page);
            $response["max_pages"]=$this->proposing->getMaxPages();

            return Response()->json($response,200);
        }
        return Response()->json("Error",400);
    }

    public function store(Request $request){
        if($request->hasFile('files')){

            $post = new Post();
            $post->like_count=0;
            $post->content=$request->get('content');
            $post->user_id=Auth::user()->id;
            $post->save();
            foreach ($request->file('files') as $file){
                $post_image= new Post_images();
                $post_image->post_id=$post->id;
                $post_image->image_url=$file->store('post_photos');

                $post->PostImages()->save($post_image);
            }
            return Response()->json("Post_Created",201);
        }
        return Response()->json("Error",400);

    }

    public function postCount(User $User){
       return Response($User->postCount(),200);
    }

    public function likeCount(Post $Post){
        if($Post->exists){
            return Response()->json(array(
                "like_count"=>$Post->like_count,
                "liked"=>$Post->isUserLiked(Auth::user()->id)
            ),200);
        }
        return Response()->json("Error",400);
    }

    public function like(Post $Post){
        $userId=Auth::user()->id;
        if($Post->exists){
            if($Post->isUserLiked($userId)){
                $Post->disLike();
                $Post->PostLikes()->where('user_id','=',$userId)->delete();
                $Post->save();
                return Response()->json("Disliked",200);
            }
            $Post->like();
            $likes=new Post_likes();
            $likes->user_id=$userId;
            $Post->PostLikes()->save($likes);
            $Post->save();
            return Response()->json("Liked",200);
        }
        return Response()->json("Error",400);
    }




    public function delete(Request $request){
        if(!$request->has("user_id") and !$request->has("post_id")){
            return Response()->json("Error",400);
        }
        $userId=$request->user_id;
        $postId=$request->post_id;
        $post=Post::find($postId);

        if($userId != Auth::user()->id or $userId != $post->Author()->id){
            return  Response()->json("error",403);
        }

        $images=$post->PostImages()->get();
        foreach ($images as $image){
            if(Storage::exists($image->image_url)){
                Storage::delete($image->image_url);
            }
            $image->delete();
        }
        $comments=$post->PostComments()->get();
        foreach ($comments as $comment){
            $comment->CommentLikes()->delete();
            $comment->delete();
        }
        $post->PostLikes()->delete();
        $post->delete();
        return Response()->json("ok",200);
    }



}
