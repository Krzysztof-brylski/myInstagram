<div class="photo-element d-none flex-column justify-content-center align-items-center">
    <h4>Twoje zdjęcie profiliowe</h4>
    <img src="{{asset('storage/default.png')}}" class="user-photo user-photo-preview">
    <p class="my-3">dodaj zdjęcie aby twoi znajomi mogli cię rozpoznać</p>

    <input
        class="photo-input"
        type="file"
        name="photo"
        accept=".png, .jpg, .jpeg"
        multiple = false
    >


    <button class="form-submit" type="submit"> Zapisz </button>
</div>
