<script>
    const request_url='{{route('search_user')}}';
    const user_show_url='{{url('User/')}}';
    const storage='{{asset('storage/')}}';
    const followGateWay='{{url("user/follow/")}}';

    const userInfo={
        csrf:document.getElementById('csrf-token').content,
        userId:"{{Auth::user()->id}}",
        userName:"{{Auth::user()->name}}",
        userPhoto:"{{Auth::user()->Info->photo}}",
        storage:'{{asset('storage/')}}',
    };
    const posts={
        postsGateWay:'{{url('post/')}}',
        postsDeleteGateWay:'{{url('delete/post')}}',
        postsProposedGateWay:'{{url('proposing/')}}',
        postsLikeGateWay:'{{url('post/')}}',
        postsLikeCounterGateWay:'{{url('post/likes/')}}',
        postCommentsGateWay:'{{url('post/comments/')}}',
        postCommentsLikeGateWay:'{{url('post/comments/likes/')}}',
        postCountGateWay:"{{url("/post/count/")}}",
    }
</script>
@viteReactRefresh
@vite(['resources/js/searching/search.jsx'])
@vite(['resources/js/posts/add/add_post.jsx'])
@vite(['resources/js/posts/display/post_carousel.jsx'])

<header class="bg-white py-3">
    <div class="row align-items-center">
        <div class="col-xl-4 d-flex justify-content-end">
            <img  width="120px" src="{{asset('img/login-page/logo.png')}}">
        </div>
        <div class="col-xl-4  d-flex justify-content-center" id="search-form-container">
        </div>
        <div class="col-xl-4 d-flex  d-flex justify-content-right ">
            <div>
                <svg aria-label="Pulpit" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg>
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



