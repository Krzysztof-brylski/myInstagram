import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'

import axios from "axios";

function Add_profile_image() {
    const[image,setImage]=useState(null);
    const[selectedImage,setSelectedImage]=useState(null);
    const[formData,setFormData]=useState(null);
    const [crop, setCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        width:100,
        height:100,
    });
    const canvas=useRef();

    var imagePreview=storage+"/user_photos/default.png";
    selectedImage === null ? null : imagePreview = URL.createObjectURL(selectedImage);
    function dataURLtoFile(dataUrl, fileName) {

        var arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, {type:mime});
    }
    function handleOnComplete(crop){
        canvas.current.width=crop.width;
        canvas.current.height=crop.height;
        const ctx=canvas.current.getContext('2d');
        const tempImage = new Image();
        tempImage.src=URL.createObjectURL(image);
        tempImage.onload=function(){
            ctx.drawImage(
                tempImage,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height,
            );
            setSelectedImage(dataURLtoFile(canvas.current.toDataURL("image/jpg"),"newImage.jpg"));
        };

    }

    const handleFileInput=(event)=>{
        //if(event.target.files.length !== 1)return null;
        setImage(event.target.files[0]);
    };
    const closeModal=()=>{
        setImage(null);
    };
    const selectImage=()=>{
        if(selectedImage === null){return null};
        let form=document.getElementById("additional_info");
        let formData= new FormData(form);
        formData.set("photo",selectedImage);
        setFormData(formData);
        closeModal();
    };
    const sendForm=()=>{
        if(formData === null){return null};
        axios.post(userInfoGateWay,formData).then((res)=>{
            if(res.status===200){
                window.location.href = "/home/";
            }
        });
    };
    const ModalStyle={
        inset:`${window.scrollY}px 0 0 0 `,
        zIndex:"99999",
    };

    return(
        <div className="d-flex flex-column justify-content-center align-items-center ">
        <h4>Twoje zdjęcie profiliowe</h4>
        <img src={imagePreview} className="user-photo user-photo-preview"/>
        <p className="my-3 text-center">dodaj zdjęcie aby twoi znajomi mogli cię rozpoznać</p>
        <input
                onChange={handleFileInput}
                type="file"
                accept=".png, .jpg, .jpeg"
        />
            <button type="button" onClick={sendForm} className="btn-primary btn mx-2 my-2">Zapisz</button>
        {
            image !== null &&
            <div className="modal-overlay" style={ModalStyle} onClick={(event => {event.stopPropagation()})}>
                <div className="d-flex justify-content-center align-items-center h-100 "  >
                    <div className="content d-flex flex-column align-items-center p-5 bg-white w-auto h-auto">
                        <ReactCrop crop={crop}
                                   onChange={(crop)=>{setCrop(crop)}}
                                   aspect={1}
                                   minWidth={100}
                                   minHeight={100}
                                   maxWidth={250}
                                   maxHeight={250}
                                   circularCrop={true}
                                   onComplete={(crop, pixelCrop)=>{handleOnComplete(crop, pixelCrop)}}
                                   keepSelection={true} >
                            <img src={URL.createObjectURL(image)} />
                        </ReactCrop>
                        <div className="d-flex my-3 ">
                            <button type="button" className="btn btn-danger mx-2" onClick={closeModal}>Odrzuć</button>
                            <button type="button" className="btn btn-success mx-2" onClick={selectImage}>Zapisz</button>
                        </div>
                    <canvas hidden ref={canvas}></canvas>
                    </div>
                </div>
            </div>
        }

        </div>
    );



}
ReactDOM.render(<Add_profile_image/>,document.querySelector('#Add-profile-image'));
