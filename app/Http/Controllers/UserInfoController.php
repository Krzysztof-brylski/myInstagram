<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserInfoRequest;
use App\Models\User;
use App\Models\UserInfo;
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
        $months=__('login_and_register/UserInfo.months');
        return view('auth.additional_info.additional_info', [
            'user'=>Auth::user(),
            'months'=>$months
            ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserInfoRequest $request
     * @param User $User
     * @return void
     */
    public function store(UserInfoRequest $request,User $User)
    {

        $data=$request->validated();
        $info = new UserInfo();

        $info->birth_day = $data["birth_day"];
        $request->has("public_status") ? $info->public_status=true : $info->public_status=false;
        $info->description = $data["description"];

        Schema::create("user_follows_".$User->username, function (Blueprint $table) {
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
        return Response()->json("ok",200);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

}
