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
class PostController extends Controller
{
    private $proposing;

    public function __construct(){
        $this->proposing= new PostPackDto();
    }

    public function show(User $User){
        if(!$User->exists){
            return Response()->json("Error",303);
        }
        $posts=Post::query()->where('user_id','=',$User->id)->get()->all();
        $response=array();
        foreach ($posts as $post){
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
            $response[$post->id]=[
                'post_id'=>$post->id,
                'author'=>$author_data,
                'content'=> $post->content,
                'like_count'=> $post->like_count,
                'liked'=>$post->isUserLiked(Auth::user()->id),
                'images'=> $images_src,
            ];
        }
        return Response()->json(array_reverse($response),200);
    }

    public function proposedPosts(Request $request){
        $this->proposing->build(Auth::user());
        if($request->has("page")){
            $page=$request->page;
            return Response()->json($this->proposing->getPostPac($page),200);
        }
        return Response()->json("",400);
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
            return Response()->json(["Post_Created"],200);
        }
        return Response()->json(["Error"],400);
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
    }

    public function like(Post $Post){
        $userId=Auth::user()->id;
        if($Post->exists){
            if($Post->isUserLiked($userId)){
                $Post->disLike();
                $Post->PostLikes()->where('user_id','=',$userId)->delete();
                $Post->save();
                return Response()->json("disLiked",200);
            }
            $Post->like();
            $likes=new Post_likes();
            $likes->user_id=$userId;
            $Post->PostLikes()->save($likes);
            $Post->save();
            return Response()->json("Liked",200);
        }
    }





}
