<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WelcomeController extends Controller
{
    /**
     * redirecting logged to home page
     * @return View|Response
     */
    public function index(){
        if(Auth::user()){
            return redirect('home');
        }
        return view('auth.login');
    }
}
