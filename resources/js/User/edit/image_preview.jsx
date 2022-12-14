import React, {useState, useRef} from 'react';
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'
import axios from "axios";
import Error_modal from "../../helpers/error";
function Image_preview({image,setFile,setDisplaySuccess=null, setDisplayModal=null}) {
    const ModalStyle={
        inset:`${window.scrollY}px 0 0 0 `,
        zIndex:"99999",
    };
    const canvas=useRef();
    const [newFile,setNewFile]=useState(null);
    const[displayError,setDisplayError]=useState(false);
    const[errorMessage,setErrorMessage]=useState(null);
    const [crop, setCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        width:100,
        height:100,
    });
    const ErrorModalToggle=()=>{
        setDisplayError(!displayError);
    }
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
            setNewFile(dataURLtoFile(canvas.current.toDataURL("image/jpg"),"newImage"));
        };
    }
    const send=()=>{
        if(newFile === null)return null;
        let formData= new FormData();
        formData.append("_token",userInfo.csrf);
        formData.append("newImage",newFile);
        axios.post(userImageUpdateGateWay,formData).then((response)=>{
            console.log(response);
            if(response.status === 200){
                setDisplaySuccess !== null ?setDisplayModal(false):null;
                setDisplaySuccess(true);
            }

        }).catch((error)=>{
            //setDisplayModal !== null ? setDisplayModal(false):null;
            setErrorMessage(Object.values(error.response.data)[0][0]);
            setDisplayError(true);
        });
    };

    return(
        <div className="modal-overlay" style={ModalStyle} onClick={(event => {event.stopPropagation()})}>
            <div className="d-flex justify-content-center align-items-center h-100 "  >
                <div className="content d-flex flex-column align-items-center p-5 bg-white w-auto h-auto">
                    <ReactCrop crop={crop}
                               onChange={(crop)=>{setCrop(crop)}}
                               aspect={1}
                               minWidth={200}
                               minHeight={200}
                               maxWidth={250}
                               maxHeight={250}
                               circularCrop={true}
                               onComplete={(crop, pixelCrop)=>{handleOnComplete(crop, pixelCrop)}}
                               keepSelection={true} >
                        <img src={URL.createObjectURL(image)} />
                    </ReactCrop>
                    <p className="my-3 text-center ">Oto twoje nowe piękne zdjęcie profilowe,<br/> chcesz je zatrzymać ?</p>
                    <div className="d-flex flex-row mx-4 my-3">
                        <button className="btn btn-danger mx-2" onClick={()=>{setFile(null)}}>Odrzuć</button>
                        <button className="btn btn-success mx-2" onClick={send}>Zapisz</button>
                    </div>
                <canvas hidden  ref={canvas}> </canvas>
                </div>
            </div>
            <Error_modal display={displayError} toggle={ErrorModalToggle} errorMessage={errorMessage} killCallback={()=>{setFile(null); }}/>
        </div>
    );
}
export default Image_preview;
