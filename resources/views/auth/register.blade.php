@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display:flex;flex-direction:column;justify-content: center; align-items: center">

                <div class="card w-25 mx-1" >
                    <div class="card-body flex flex-column justify-content-center">
                        <div class="logo my-3">
                            <img src="img/login-page/logo.png">
                        </div>
                        <h6 style="text-align: center;font-size:large;color: #8e8e8e;">{{__('login_and_register/register.note')}}</h6>
                        <button class="form-submit">
                            {{__('login_and_register/register.login_via_fb')}}
                        </button>
                    </div>
                    <div class="justify-content-center align-items-center my-3" style="display: flex;">
                            <hr class="line">
                            <div class="mx-3" style="font-weight: bold; color:#8e8e8e ">
                                or
                            </div>
                            <hr class="line">
                    </div>
                    <form method="POST" action="{{route('register')}}" class="mx-4 mb-5">
                        @csrf
                        <input id="email" type="email" class="form-input @error('name') is-invalid @enderror" name="email" placeholder="{{__('login_and_register/register.input.email')}}" required  autofocus>
                        @error('email')
                        <strong class="error_message">{{$message}}</strong>
                        @enderror
                        <input id="name" type="text" class="form-input @error('email') is-invalid @enderror" name="name" placeholder="{{__('login_and_register/register.input.name_surname')}}"  required  autofocus>
                        @error('name')
                        <strong class="error_message">{{$message}}</strong>
                        @enderror
                        <input id="username" type="text" class="form-input @error('username') is-invalid @enderror" name="username"  placeholder="{{__('login_and_register/register.input.username')}}" required autofocus>
                        @error('username')
                        <strong class="error_message">{{$message}}</strong>
                        @enderror
                        <input id="password" type="password" class="form-input @error('password') is-invalid @enderror" name="password" placeholder="{{__('login_and_register/register.input.password')}}" required autofocus>
                        @error('password')
                        <strong class="error_message">{{$message}}</strong>
                        @enderror
                        <p class="text-center" style="color:#8e8e8e;">
                            {{__('login_and_register/register.note')}}
                        </p>

                        <input type="submit"  class="form-submit" value="{{__('login_and_register/register.input.submit')}}">
                    </form>

                </div>
                <div class="card w-25 my-4">
                    <div class="card-body text-center">
                        {{__('login_and_register/register.has_acc')}} <a class="register-anhor" href="{{route('login')}}">{{__('login_and_register/register.login')}}</a>
                    </div>
                </div>
          </div>
    </div>
</div>
@endsection
