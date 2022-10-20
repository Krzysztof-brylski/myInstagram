<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserInfoRequest;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserInfoController extends Controller
{


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('auth.additional_info',['user'=>Auth::user()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserInfoRequest $request
     * @param User $User
     * @return void
     */
    public function store(userInfoRequest $request,User $User)
    {
        $data=$request->validated();
        $info = new UserInfo($data);
        if($request->hasFile('photo')){
            //check if user selected photo if not use default depend on user sex
            !is_null($data->photo) ?
                $info->photo=$request->file('photo')->store('user_photos'):
                $info->set_default_photo();
        }

        $User->Info()->save($info);
        return redirect(route('home'));
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
