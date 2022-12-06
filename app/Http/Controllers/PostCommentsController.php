<?php

namespace App\Http\Controllers;

use App\Models\Post_comments_likes;
use App\Models\Post;
use App\Models\Post_comments;
use App\ValueObjects\commentsContainerVo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Dto\user\userDto;
use App\Dto\comment\commentDto;
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
            $commentDtos=array();
            foreach ($comments  as $comment){
                $authorDto= new userDto($comment->Author()->all()[0]);
                $commentDto = new commentDto($comment);
                array_push($commentDtos,[$authorDto,$commentDto]);
            }
            $commentsVo = new commentsContainerVo($commentDtos);
            return Response()->json($commentsVo->get(),200);
        }
        return Response()->json("PostDontExist",404);
    }

    public function likeCount($Post_comments){
        $Post_comment = Post_comments::find($Post_comments);
        if($Post_comment != null){
            return Response()->json(array(
                "like_count"=>$Post_comment->like_count,
                "liked"=>$Post_comment->isUserLiked(Auth::user()->id)
            ),200);
        }
    }

    public function likeComment($Post_comments)
    {
        $userId = Auth::user()->id;
        $Post_comment = Post_comments::find($Post_comments);
        if ($Post_comment != null) {
            if ($Post_comment->isUserLiked($userId)) {
                $Post_comment->disLike();
                $Post_comment->CommentLikes()->where('user_id', '=', $userId)->delete();
                $Post_comment->save();
                return Response()->json("disLiked", 200);
            }
            $Post_comment->like();
            $likes=new Post_comments_likes();
            $likes->user_id=$userId;
            $Post_comment->CommentLikes()->save($likes);
            $Post_comment->save();
           return Response()->json("Liked",200);
        }
        return Response()->json("",404);
    }
}
