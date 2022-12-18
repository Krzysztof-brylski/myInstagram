<?php

namespace App\Http\Controllers;

use App\Http\Requests\post\PostCommentCreateRequest;
use App\Models\Post_comments_likes;
use App\Models\Post;
use App\Models\Post_comments;
use App\ValueObjects\commentsContainerVo;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Dto\user\userDto;
use App\Dto\comment\commentDto;
use App\Dto\comment\commentContentDto;
use function Symfony\Component\Process\findArguments;

class PostCommentsController extends Controller
{
    /**
     * handing create comment request
     * @param PostCommentCreateRequest $request
     * @return Response
     */
    public function comment(PostCommentCreateRequest $request){
        $data=$request->validated();
        $Post=Post::find($data["post_id"]);
        $postComment=new Post_comments();
        $postComment->user_id=Auth::user()->id;
        $postComment->like_count=0;
        $postComment->content=$data["comment"];
        $Post->PostComments()->save($postComment);
        return Response()->json("Done",200);
    }

    /**
     * return all comments to specified post
     * @param Post $Post
     * @return Response
     */
    public function getComments(Post $Post){
        if($Post->exists){
            $comments=$Post->PostComments()->get()->all();
            $commentDtos=array();
            foreach ($comments  as $comment){
                $authorDto= new userDto($comment->Author()->all()[0]);
                $commentContainerDto = new commentContentDto($comment);
                array_push($commentDtos,new commentDto($authorDto,$commentContainerDto));
            }
            $commentsVo = new commentsContainerVo($commentDtos);
            return Response()->json($commentsVo->get(),200);
        }
        return Response()->json("PostDontExist",404);
    }

    /**
     * return comment like count and information if current auth user liked this comment
     * @param $Post_comments
     * @return \Illuminate\Http\JsonResponse
     */
    public function likeCount($Post_comments){
        $Post_comment = Post_comments::find($Post_comments);
        if($Post_comment != null){
            return Response()->json(array(
                "like_count"=>$Post_comment->like_count,
                "liked"=>$Post_comment->isUserLiked(Auth::user()->id)
            ),200);
        }
    }

    /**
     * handing like or dislike comment request
     * @param $Post_comments
     * @return \Illuminate\Http\JsonResponse
     */
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
