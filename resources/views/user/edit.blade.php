@extends('layouts.app')
@section('content')

@include('layouts/app_header')
@viteReactRefresh
@vite(['resources/js/user/edit/edit_profile_photo.jsx'])
@vite(['resources/js/user/edit/edit_password.jsx'])
<div class="container my-5 w-100 h-100 d-flex justify-content-center">
    <div class="bg-white  w-50 h-75 p-4">
        <div class="d-flex align-items-center ">
            <img class="profile-img" src="{{asset("storage/".$user->info->photo)}}">
            <div>
                <h3 style="font-weight: 400;" class="mx-2 my-0">{{$user->name}}</h3>
                <div id="Edit-profile-photo"></div>
            </div>
        </div>
        <div class="d-flex  justify-content-center my-3">
            <form action="{{route("user_edit_save")}}" method="post" id="edit_user_form" class="d-flex flex-column justify-content-center w-100 mx-5 px-5">
                @csrf
                <div class="d-flex my-3  flex-row w-100">
                    <span class="h6 fw-bold m-0 w-25">Imie i nazwisko</span>
                    <div class="d-flex flex-column mx-2">
                        <input name="name" class="m-0 w-100 form-input" style="border-radius: 5px;" type="text" placeholder="{{$user->name}}">
                        <p class="my-1" style="font-size: small; color: #838383" >opis pola 1231231231231endiqwdjiqw dqwijdqw dqwdq weqw</p>
                    </div>
                </div>

                <div class="d-flex my-3 flex-row  w-100">
                    <span class="h6 fw-bold m-0 w-25 ">Nazwa urzytkownika</span>
                    <div class="d-flex flex-column mx-2">
                        <input name="username" class="m-0 w-100 form-input" style="border-radius: 5px;" type="text" placeholder="{{$user->username}}">
                        <p class="my-1" style="font-size: small; color: #838383" >opis pola 1231231231231endiqwdjiqw dqwijdqw dqwdq weqw</p>
                    </div>
                </div>

                <div class="d-flex my-3 flex-row  w-100">
                    <span class="h6 fw-bold m-0 w-25 ">Opis proflu</span>
                    <div class="d-flex flex-column mx-2">
                        <textarea name="description" form="edit_user_form" class="m-0 w-100 form-input description-input" style="border-radius: 5px; height: 150px;" maxlength="150"  >{{$user->info->description}}</textarea>
                        <p class="my-1" style="font-size: small; color: #838383" >opis pola 1231231231231endiqwdjiqw dqwijdqw dqwdq weqw</p>
                    </div>
                </div>

                <div class="d-flex my-3 flex-row justify-content-center align-items-center w-100">
                    <span class="h6 fw-bold mx-2 my-0 w-25 ">Profil publiczy</span>
                    <div class="form-check form-switch mx-2 my-0 ">
                        <input name="public_status" class="form-check-input" style="width: 50px;height: 25px;" type="checkbox" role="switch" id="flexSwitchCheckDefault" @if($user->info->public_status) checked @endif >
                    </div>
                    <p class="mx-2 my-0" style="font-size: small; color: #838383" >opis pola</p>
                </div>
                <div class="my-4 text-center">
                    <h3 class="my-1" style="font-weight: 500;  color: #838383">Infoamcje prytwatne</h3>
                    <p class="my-0" style="font-size: small; color: #838383" >Podane informacje prywatne nie będą częścią twojego profilu</p>
                </div>

                <div class="d-flex my-3 flex-row  w-100">
                    <span class="h6 fw-bold m-0 w-25 ">Zmień hasło</span>
                    <div class="d-flex flex-column mx-2" id="Edit_password">

                    </div>
                </div>

                <div class="d-flex my-3 flex-row  w-100">
                    <span class="h6 fw-bold m-0 w-25 ">Adres e-mail</span>
                    <div class="d-flex flex-column mx-2">
                        <input name="email" class="m-0 w-100 form-input" style="border-radius: 5px;" type="email" placeholder="{{$user->email}}">
                        <p class="my-1" style="font-size: small; color: #838383" >opis pola 1231231231231endiqwdjiqw dqwijdqw dqwdq weqw</p>
                    </div>
                </div>
                <div class="d-flex my-3 flex-row  w-100">
                    <span class="h6 fw-bold m-0 w-25 ">Data urodzin</span>
                    <div class="d-flex flex-column mx-2">
                        <input name="birth_day" class="m-0 w-100 form-input" style="border-radius: 5px;" type="date" value="{{$user->info->birth_day}}">
                        <p class="my-1" style="font-size: small; color: #838383" >opis pola 1231231231231endiqwdjiqw dqwijdqw dqwdq weqw</p>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary w-25 fs-6">Zapisz</button>
                </div>
            </form>


        </div>
    </div>
</div>
@endsection
