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
                return view('user/admin',['user'=>$User]);
            }
            return view('user/show',['user'=>$User]);
        }
    }
}
