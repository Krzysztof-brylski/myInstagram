@extends('layouts.app')

@section('content')
    <div class="container">
        <div style="display:flex;flex-direction:column;justify-content: center; align-items: center">

            <div class="card w-25 mx-1" >
                <div class="card-body flex flex-column justify-content-center">

                    <form action="POST" enctype="multipart/form-data" action="{{route('UserInfo.store',$user->id)}}">

                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
