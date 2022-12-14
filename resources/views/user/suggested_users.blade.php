@extends('layouts.app')
@section('content')
@include('layouts/app_header')
    <div class="w-100 d-flex justify-content-center py-5 ">
        <div class="w-50 d-flex flex-column justify-content-center bg-white ">
            <h5 class="my-2 mx-3">Nasze propozycje:</h5>
            @foreach(session()->get("suggestedUsers") as $suggestedUser)
                <a href="{{route("User.show",["User"=>$suggestedUser->id])}}" class="searching-result-anhor my-1 p-1">
                    <div class='searching-result-container d-flex'>
                        <div class="mx-2">
                            <img src="{{asset("storage/".$suggestedUser->image)}}" class="searching-result-img" width="50px" height="50px"/>
                        </div>
                        <div class="searching-result-text">
                            <h6>{{$suggestedUser->name}}</h6>
                            <span>{{$suggestedUser->username}}</span>
                        </div>
                    </div>
                </a>
            @endforeach
        </div>
    </div>


@endsection
