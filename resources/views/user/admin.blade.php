@extends('layouts.app')
@viteReactRefresh
@vite(['resources/js/user/my_posts_preview.jsx'])
@section('content')
@include('layouts/app_header')


<div class="my-5" >
    <div class="row" style="margin-left: 20%;margin-right: 20%;">
        <div class="col-xl-3 d-flex justify-content-center">
            <img src="{{asset("storage/".$user->Info->photo)}}"  style="width:150px; height:150px;border:1px solid transparent; border-radius: 100%;"/>
        </div>
        <div class="col-xl-9 px-4">
            <div class="row">
                <div class="col-xl-12 d-flex flex-row ">
                    <h2>{{$user->name}}</h2>
                    <button  class="mx-5 ">Edytuj Profil</button>
                </div>
                <div class="col-xl-12 d-flex flex-row my-3">
                    <span class="mx-5" style="font-size: medium;font-weight: 500;">posty: {{$posts_count}}</span>
                    <span class="mx-5" style="font-size: medium;font-weight: 500;">obserwujących: {{$followers_count}} </span>
                </div>
                <div class="col-xl-12">
                    <p style="fontWeight:400;fontSize:medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis ornare nibh eu tempus.
                        Sed ut arcu sed odio molestie laoreet. Nunc ac malesuada neque. Nulla facilisi. Sed sed ornare massa.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="Posts-preview"></div>
@endsection
