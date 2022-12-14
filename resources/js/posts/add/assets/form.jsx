import React from 'react';
import {useDropzone} from "react-dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";


const ImageForm=(props)=>{

    if(!props.show) return null;

    const {getRootProps,getInputProps}=useDropzone({
        accept:"image/*",
        onDrop: (acceptedFiles => {
            if(acceptedFiles.length>0) {
                console.log(acceptedFiles);
                props.setFiles(
                    acceptedFiles.map((file) => Object.assign(file, {
                        preview: URL.createObjectURL(file),

                    })
                    )
                );
                props.showFrom(!props.show);
                props.preView(true);
            }
        }),
    });

    return(

        <div className="modal-form-container d-flex flex-column align-items-center justify-content-center" {...getRootProps()}>
            <input {...getInputProps()}/>
            <FontAwesomeIcon icon={faImage} size={"6x"} className="my-3"/>
            <h3 >Przeciągnij zdjęcia lub filmy</h3>
            <p  className="my-4">Akceptowalne wymiary zdjęcia od: 500x500 do: 1000x1000 pikseli</p>
            <button className="form-submit my-2 w-auto">Wybierz z komputera</button>
        </div>

    );
}
export default ImageForm;
