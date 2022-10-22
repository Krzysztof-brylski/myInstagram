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
    <p>Musisz podać swoją datę urodzenia</p>

    <p>Podaj własną datę urodzenia, nawet jeśli jest to konto firmy, zwierzaka lub inne</p>
    <button class="form-submit btn-next-element" type="button"> Dalej </button>
</div>
