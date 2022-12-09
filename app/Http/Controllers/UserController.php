<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

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
                    'followed'=>Auth::user()->isUserFollowed($User->id),
                ]);
        }
    }

    public function follow(User $User){
        if($User->exists and Auth::user()->id != $User->id ){
            if(Auth::user()->isUserFollowed($User->id)){
                $count=Auth::user()->cancelFollowUser($User->id);
                return Response()->json(["status"=>"unFollowed","followers_count"=>$count],200);
            }
            $count=Auth::user()->followUser($User->id);
            return Response()->json(["status"=>"Followed","followers_count"=>$count],200);
        }
        return Response()->json("UserDontExist",404);
    }

    public function edit(User $User){
        return view("user/edit",["user"=>$User]);
    }

    public function update(UserUpdateRequest $request){
        //dd($request->all());
        $data=$request->validated();
        $user=Auth::user();

        $data["name"] != null && $user->name=$data["name"];
        $data["username"] != null && $user->username=$data["username"];
        $data["email"] != null && $user->email=$data["email"];

        $request->has("public_status") ? $user->info->public_status=true : $user->info->public_status=false;
        $user->info->description=$data["description"];
        $user->info->birth_day=$data["birth_day"];

        $user->info->save();
        $user->save();

        return Redirect(route("user_edit",$user->id));
    }
    public function updateImage(Request $request){
        $User=Auth::user();
        if($request->hasFile("newImage")){

            if($User->info->photo != "user_photos/default.png"){
                if(Storage::exists($User->info->photo)){
                    Storage::delete($User->info->photo);
                }
            }
            $User->info->photo=$request->file('newImage')->store('user_photos');
            $User->info->save();
            return Response()->json("okii",200);
        }
        if($request->has("newImage")){
            if($request->newImage === "false"){
                if($User->info->photo != "user_photos/default.png"){
                    if(Storage::exists($User->info->photo)){
                        Storage::delete($User->info->photo);
                    }
                }
                $User->info->photo="user_photos/default.png";
                $User->info->save();
                return Response()->json("okii",200);
            }
        }
        return Response()->json("error",500);
    }

}
