@extends('layouts.app')
@viteReactRefresh
@vite(['resources/js/user/my_posts_preview.jsx'])
<script src="https://kit.fontawesome.com/7a1ae6883e.js" crossorigin="anonymous"></script>
@section('content')
@include('layouts/app_header')


<div class="my-5" >
    <div class="row" style="margin-left: 20%;margin-right: 20%;">
        <div class="col-xl-3 d-flex justify-content-center">
            <img src="{{asset("storage/".$user->Info->photo)}}"  style="width:150px; height:150px;border:1px solid transparent; border-radius: 100%;"/>
        </div>
        <div class="col-xl-9 px-4">
            <div class="row">
                <div class="col-xl-6 d-flex flex-column ">
                    <div><h2 class="m-0">{{$user->name}}</h2></div>
                    <span class="my-3" style="font-size: medium;font-weight: 500;">posty: {{$posts_count}}</span>
                </div>
                <div class="col-xl-6 d-flex flex-column ">
                    <a href="{{route('user_edit',Auth::user()->id)}}"style="text-decoration: none;color: black;width: fit-content;z-index: 2;">
                        <i class="fa-solid fa-gear fa-2x " style="width:40px;"></i>
                    </a>
                    <span class="my-3" style="font-weight: 500;font-size: medium;"> obserwujący: {{$followers_count}}</span>
                </div>
                <div class="col-xl-12">
                    <p style="fontWeight:400;fontSize:medium">
                        {{$user->Info->description}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="Posts-preview"></div>
@endsection
