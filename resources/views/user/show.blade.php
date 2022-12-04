@extends('layouts.app')

@viteReactRefresh
@vite(['resources/js/user/posts_preview.jsx'])
@vite(['resources/js/user/user_follow_btn.jsx'])
<script>
    const selectedUserId="{{$user->id}}";
    const isUserFollowed="{{$followed}}";
    const startFollowersCount="{{$followers_count}}"
</script>

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
                    <div class="col-xl-6 d-flex flex-column my-3 justify-content-start" id="User-follow-btn">

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
