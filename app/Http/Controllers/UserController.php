<?php

namespace App\Http\Controllers;

use App\Http\Requests\user\UserUpdateImageRequest;
use App\Http\Requests\user\UserUpdateRequest;
use App\Http\Requests\UserDeleteImageRequest;
use App\Models\User;
use App\Suggesting\SuggestingUsers;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * return profile view or admin profile view is specified user is same as auth user
     * @param User $User
     * @return View | View
     */
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

    /**
     * handling follow or un-follow request
     * @param User $User
     * @return \Illuminate\Http\JsonResponse
     */
    public function follow(User $User){

        if($User->exists and Auth::user()->id != $User->id ){
            if(Auth::user()->isUserFollowed($User->id)){
                $count=Auth::user()->cancelFollowUser($User->id);
                $suggestedUsers= new SuggestingUsers(Auth::user());
                session(['suggestedUsers'=>$suggestedUsers->getSuggestedUsers()]);
                return Response()->json(["status"=>"unFollowed","followers_count"=>$count],200);
            }
            $count=Auth::user()->followUser($User->id);
            $suggestedUsers= new SuggestingUsers(Auth::user());
            session(['suggestedUsers'=>$suggestedUsers->getSuggestedUsers()]);
            return Response()->json(["status"=>"Followed","followers_count"=>$count],200);
        }
        return Response()->json("UserDontExist",404);
    }

    /**
     * return  edit user data view
     * @param User $User
     * @return View
     */
    public function edit(User $User){
        return view("user/edit",["user"=>$User]);
    }

    /**
     * handling user edit request
     * @param UserUpdateRequest $request
     * @return Redirect
     */
    public function update(UserUpdateRequest $request){
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

    /**
     * handling user image update request
     * @param UserUpdateImageRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateImage(UserUpdateImageRequest $request){
        $request->validated();
        $User=Auth::user();
        if($User->info->photo != "user_photos/default.png"){
            if(Storage::exists($User->info->photo)){
                Storage::delete($User->info->photo);
            }
        }
        $User->info->photo=$request->file('newImage')->store('user_photos');
        $User->info->save();
        return Response()->json("ok",200);
    }

    /**
     * return view with all suggested users
     * if wants json return json-response with all   suggested users
     * @param Request $request
     * @return Veiw|Response
     */
    public function showSuggestedUsers(Request $request){
        if($request->wantsJson()){
            return Response()->json(session()->get('suggestedUsers'),200);
        }
        return view("user/suggested_users");
    }

    /**
     * handling deleting image request
     * @return Response
     */
    public function deleteImage(){
        $User=Auth::user();
        if($User->info->photo != "user_photos/default.png"){
            if(Storage::exists($User->info->photo)){
                Storage::delete($User->info->photo);
            }
        }
        $User->info->photo="user_photos/default.png";
        $User->info->save();
        return Response()->json("ok",200);
    }

}
