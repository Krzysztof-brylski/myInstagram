<script>
    const search_url='{{route('search_user')}}';
    const user_show_url='{{url('User/')}}';
    const storage='{{asset('storage/')}}';
    const followGateWay='{{url("user/follow/")}}';
    const userInfo={
        csrf:document.getElementById('csrf-token').content,
        userId:"{{Auth::user()->id}}",
        userName:"{{Auth::user()->name}}",
        userPhoto:"{{Auth::user()->Info->photo}}",

    };
    const posts={
        postsGateWay:'{{url('post/')}}',
        postsDeleteGateWay:'{{url('delete/post')}}',
        postsProposedGateWay:'{{url('proposing/')}}',
        postsLikeGateWay:'{{url('post/')}}',
        postsLikeCounterGateWay:'{{url('post/likes/')}}',
        commentPostGateWay:'{{url('/addPostComment/')}}',
        postCommentsGateWay:'{{url('post/comments/')}}',
        postCommentsLikeGateWay:'{{url('post/comments/likes/')}}',
        postCountGateWay:"{{url("/post/count/")}}",
    }
</script>
@viteReactRefresh
@vite(['resources/js/searching/search.jsx'])
@vite(['resources/js/posts/add/add_post.jsx'])
@vite(['resources/js/posts/display/post_carousel.jsx'])
<script src="https://kit.fontawesome.com/7a1ae6883e.js" crossorigin="anonymous"></script>
<header class="bg-white py-3">
    <div class="row align-items-center">
        <div class="col-xl-4 d-flex justify-content-end">
            <a href="{{url("/")}}">
                <img  width="120px" src="{{asset('img/login-page/logo.png')}}">
            </a>
        </div>
        <div class="col-xl-4  d-flex justify-content-center" id="search-form-container">
        </div>
        <div class="col-xl-4 d-flex  d-flex justify-content-right ">
            <div>
                <a href="{{route("home")}}">
                <svg class="pointer-svg" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                </a>
            </div>
            <div class="mx-4" id="add-post-btm">

            </div>
            <div>
                <a
                    href="{{route('User.show',Auth::user()->id)}}"
                >
                    <img style="border-radius: 100%;" width="25px" height="25px" src="{{asset('storage/'.Auth::user()->Info->photo)}}">
                </a>
            </div>
        </div>
    </div>
</header>



