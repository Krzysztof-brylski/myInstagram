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
            $comment = new Post_comments();
            $comment->Author()->save(Auth::user());
            $comment->content=$request->get('content');
            $comment->like_count=0;
            $comment->save();
            $Post->PostComments()->save($comment);
            $Post->save();
            return Response()->json("Done",200);
        }
        return Response()->json("PostDontExist",404);
    }
    public function getComments(Post $Post){
        if($Post->exists){
            $comments=$Post->PostComments()->get();
            return Response()->json($comments,200);
        }
        return Response()->json("PostDontExist",404);
    }
}
