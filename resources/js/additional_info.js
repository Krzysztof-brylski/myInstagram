const date=document.querySelector('.birth-day-element');
const photo=document.querySelector('.photo-element');
const button=document.querySelector('.btn-next-element');

const file=document.querySelector('.photo-input');
const previewPhoto=document.querySelector('.user-photo-preview');

function validate_date(date){
    return true;
}
// button event listener
button.addEventListener('click',()=>{
    if(date.classList.contains('d-flex') && validate_date(date)){
        //hiding date input
        date.classList.remove('d-block');
        date.classList.add('d-none');
        //showing photo input
        photo.classList.remove('d-none');
        photo.classList.add('d-flex');

    }
});

file.addEventListener('change',()=>{
    if(file.files.length ===0 ){
        previewPhoto.src=default_photo;
    }
    else{
        let src=URL.createObjectURL(file.files[0]);
        previewPhoto.src=src;
    }
});
