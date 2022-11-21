<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Post_comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostCommentsController extends Controller
{
    public function comment(Post $Post,Request $request){
        if($Post->exists){
            if($request->has("comment")){
                $postComment=new Post_comments();
                $postComment->user_id=Auth::user()->id;
                $postComment->like_count=0;
                $postComment->content=$request->comment;
                //$postComment->save();
                $Post->PostComments()->save($postComment);
                return Response()->json("Done",200);
            }

        }
        return Response()->json("PostDontExist",404);
    }
    public function getComments(Post $Post){
        if($Post->exists){
            $comments=$Post->PostComments()->get()->all();
            $Rresponse=array();
            foreach ($comments  as $comment){
                $author=$comment->Author()->all()[0];
                array_push($Rresponse,array(
                    "comment"=>array(
                        "id"=>$comment->id,
                        "content"=>$comment->content,
                        "like_count"=>$comment->like_count,
                    ),
                    "author"=>array(
                        "id"=>$author->id,
                        "username"=>$author->username,
                        "image"=>$author->Info->photo,
                    )
                ));

            }
            return Response()->json($Rresponse,200);
        }
        return Response()->json("PostDontExist",404);
    }
}
