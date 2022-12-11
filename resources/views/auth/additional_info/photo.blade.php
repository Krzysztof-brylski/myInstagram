
@viteReactRefresh
@vite(['resources/js/user/create/add_profile_image.jsx'])
<script>
    const userInfoGateWay="{{route('UserInfo.store',$user->id)}}";
    const storage='{{asset('storage/')}}';
</script>
<div class="photo-element d-none flex-column justify-content-center align-items-center">

    <div id="Add-profile-image"></div>
    <input
        hidden
        class="photo-input"
        type="file"
        name="photo"

    />
</div>
