<?php

namespace App\Http\Controllers;
use App\Models\Post;
use App\Models\Post_images;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{

    public function show(User $User){
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
              'author'=>$author_data,
              'content'=> $post->content,
              'like_count'=> $post->like_count,
              'images'=> $images_src,
            ];
        }
        return Response()->json($response,200);
    }

    public function like(Post $post){
        if($post->exists){
            $post->like();
            return Response()->json("",200);
        }
        return Response()->json("",500);
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
        return Response()->json(["Error"],500);
    }
}
