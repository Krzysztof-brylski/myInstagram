<div class="birth-day-element d-flex flex-column justify-content-center align-items-center">
    <img src="../img/login-page/cake.png">
    <h5>Dodaj swoją datę urodzenia</h5>
    <p>Nie będzie to częścią Twojego profilu publicznego.</p>
    <input
        type="date"
        name="birth_day"
        min="{{date('Y-m-d', strtotime('-120 year'))}}"
        max="{{date('Y-m-d', strtotime('-12 year'))}}"
        required
    >
    @error('birth_day')
    <strong class="error_message">{{$message}}</strong>
    @enderror
    <p>Musisz podać swoją datę urodzenia</p>

    <p>Podaj własną datę urodzenia, nawet jeśli jest to konto firmy, zwierzaka lub inne</p>

    <h5>Dodaj opis swojego proflu</h5>
    <textarea form="additional_info" class="w-100 description-input" placeholder="Opis twojego profilu" name="description" maxlength="500" required>

    </textarea>
    @error('description')
    <strong class="error_message">{{$message}}</strong>
    @enderror
    <h5>Publiczny profil</h5>
    <div class="form-check form-switch mx-2 my-0 ">
        <input value="1" class="form-check-input" name="public_status"style="width: 50px;height: 25px;" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked>
    </div>
    <p>Profil nie publiczny nie będzie się wyświetlał w wynikach wyszukiwania </p>

    <button class="form-submit btn-next-element" type="button"> Dalej </button>
</div>
