@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display:flex;flex-direction:column;justify-content: center; align-items: center">

                <div class="card w-25 mx-1" >
                    <div class="card-body flex flex-column justify-content-center">
                        <div class="logo my-3">
                            <img src="img/login-page/logo.png">
                        </div>
                        <h6 style="text-align: center;font-size:large;color: #8e8e8e;">Sign up to see photos and videos from your friends.</h6>
                        <button class="form-submit">
                            Zaloguj się przez Facebooka
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
                        <input id="email" type="email" class="form-input @error('name') is-invalid @enderror" name="email" placeholder="Phone,number,username or email" required  autofocus>
                        <input id="name" type="text" class="form-input @error('email') is-invalid @enderror" name="name" placeholder="Name and surname"  required  autofocus>
                        <input id="username" type="text" class="form-input @error('username') is-invalid @enderror" name="username"  placeholder="Username" required autofocus>
                        <input id="password" type="password" class="form-input @error('password') is-invalid @enderror" name="password" placeholder="Password" required autofocus>

                        <p class="text-center" style="color:#8e8e8e;">
                            Jest to kopia instarama, wykonana w celach edukacyjnych
                        </p>

                        <input type="submit"  class="form-submit" value="Zarejestruj się">
                    </form>

                </div>
                <div class="card w-25 my-4">
                    <div class="card-body text-center">
                        Masz już konto ? <a class="register-anhor" href="{{route('login')}}">Zaloguj się</a>
                    </div>
                </div>
          </div>
    </div>
</div>
@endsection
