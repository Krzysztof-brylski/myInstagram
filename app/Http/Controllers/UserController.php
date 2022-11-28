<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function show(User $User){

        if($User->exists){
            if(Auth::user()->id == $User->id){
                return view('user/admin',
                    ['user'=>$User,
                     'posts_count'=>$User->postCount(),
                     'followers_count'=>$User->followers_count,
                    ]);
            }
            return view('user/show',
                ['user'=>$User,
                    'posts_count'=>$User->postCount(),
                    'followers_count'=>$User->followers_count,
                ]);
        }
    }

    public function follow(User $User){
        if($User->exists and Auth::user()->id != $User->id ){
            if(Auth::user()->isUserFollowed($User->id)){
                Auth::user()->cancelFollowUser($User->id);
                return Response()->json("UnFollowed",200);
            }
            Auth::user()->followUser($User->id);
            return Response()->json("Followed",200);
        }
        return Response()->json("UserDontExist",404);
    }
}
