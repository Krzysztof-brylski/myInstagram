@extends('layouts.app')
@section('content')
    <div class="container">
        <div style="display:flex;flex-direction:column;justify-content: center; align-items: center">

            <div class="w-25 mx-1" >
                <div class="card-body d-flex flex-column justify-content-center align-items-center ">

                    <form name="additional_info" id="additional_info">
                        @csrf
                        @include('auth.additional_info.birthday')
                        @include('auth.additional_info.photo')


                    </form>
                </div>
            </div>

            <div class="card w-25 my-4">
                <div class="card-body text-center">
                    {{__('login_and_register/register.has_acc')}} <a class="register-anhor" href="{{route('login')}}">{{__('login_and_register/register.login')}}</a>
                </div>
            </div>


        </div>
    </div>
    <script>
        const default_photo='{{asset('storage/default.png')}}'
    </script>
@vite(['resources/js/additional_info.js'])
@endsection
