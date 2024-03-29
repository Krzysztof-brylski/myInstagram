<?php

namespace App\Http\Controllers;
use App\Http\Requests\post\PostCreateRequest;
use App\Http\Requests\post\PostDeleteRequest;
use App\Models\Post;
use App\Models\Post_images;
use App\Models\Post_likes;
use App\Models\User;
use App\Suggesting\SuggestingPosts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Dto\user\userDto;
use App\Dto\post\postDto;
use App\Dto\post\postImagesDto;
use App\ValueObjects\postsContainerVo;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    private $proposing;
    const pageSize=10;

    public function __construct(){
        $this->proposing= new SuggestingPosts(self::pageSize);
    }

    /**
     * showing posts added by specified user
     * @param User $User
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * paginate thru suggested posts, and showing current page
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function suggestedPosts(Request $request){
        $this->proposing->build(Auth::user());
        if($request->has("page")){
            $page=$request->page;
            $response=$this->proposing->getPostPac($page);
            return Response()->json($response,200);
        }
        return Response()->json("Error",400);
    }

    /**
     * saving new post created by user
     * @param PostCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PostCreateRequest $request){

        $data=$request->validated();
        $post = new Post();
        $post->like_count=0;
        $post->content=$data["content"];
        $post->user_id=Auth::user()->id;
        $post->save();
        foreach ($data["files"] as $file){
            $post_image= new Post_images();
            $post_image->post_id=$post->id;
            $post_image->image_url=$file->store('post_photos');

            $post->PostImages()->save($post_image);
        }
        return Response()->json("Post_Created",201);
    }

    /**
     * returning response with count of posts added by specified user
     * @param User $User
     * @return \Illuminate\Http\JsonResponse
     */
    public function postCount(User $User){
       return Response()->json($User->postCount(),200);
    }

    /**
     * returning response with like count of specified post,
     * and information if auth liked this post
     * @param Post $Post
     * @return \Illuminate\Http\JsonResponse
     */
    public function likeCount(Post $Post){
        if($Post->exists){
            return Response()->json(array(
                "like_count"=>$Post->like_count,
                "liked"=>$Post->isUserLiked(Auth::user()->id)
            ),200);
        }
        return Response()->json("Error",400);
    }

    /**
     * handling liking or disliking specified post
     * @param Post $Post
     * @return \Illuminate\Http\JsonResponse
     */
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
    /**
     * deleting sepcified post
     * @param PostDeleteRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(PostDeleteRequest $request){


        $data=$request->validated();
        $request->authorize();
        $userId=$data["user_id"];
        $postId=$data["post_id"];

        $post=Post::find($postId);
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
