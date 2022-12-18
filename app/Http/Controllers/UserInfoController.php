<?php

namespace App\Http\Controllers;

use App\Http\Requests\user\UserInfoRequest;
use App\Models\User;
use App\Models\UserInfo;
use App\Suggesting\SuggestingUsers;
use http\Env\Response;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserInfoController extends Controller
{


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('auth.additional_info.additional_info', [
            'user'=>Auth::user()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserInfoRequest $request
     * @param User $User
     * @return Response
     */
    public function store(UserInfoRequest $request,User $User)
    {

        $data=$request->validated();
        $info = new UserInfo();

        $info->birth_day = $data["birth_day"];
        $request->has("public_status") ? $info->public_status=true : $info->public_status=false;
        $info->description = $data["description"];

        Schema::create("user_follows_".$User->id, function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users");
            $table->timestamps();
        });

        if($request->hasFile('photo')){

            $info->photo = $request->file('photo')->store('user_photos');
            $User->Info()->save($info);
            return Response()->json("ok",200);
        }

        $info->photo = "user_photos/default.png";
        $User->Info()->save($info);

        $suggestedUsers= new SuggestingUsers(Auth::user());
        session(['suggestedUsers'=>$suggestedUsers->getSuggestedUsers()]);

        return Response()->json("ok",200);
    }
}
