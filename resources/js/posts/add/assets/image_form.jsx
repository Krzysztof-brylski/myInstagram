import React, {useState} from 'react';
import {useDropzone} from "react-dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import Error_modal from "../../../helpers/error";

// acceptable images dimensions
const minWidth=500;
const minHeight=500;
const maxHeight=1000;
const maxWidth=1000;

/**
 * part of the add_post_modal
 * displaying adding image dropdown form,
 * validating the input files size,
 * hiding self and showing next stage with is images preview
 * @component
 * @param {boolean} display; boolean for displaying image form
 * @param {function} setShowFrom; function closing modal
 * @param {function} closeForm; function hiding form
 * @param {function} setPreView; function showing images preview (next-stage)
 * @param {function} setFiles; function saving files for image preview
 * @returns {null|* <Image_form>}
 */

const Image_form=({display,setShowFrom,closeForm,setPreView,setFiles})=>{

    if(!display) return null;
    const [displayErrorModal,setDisplayErrorModal]=useState(false);

    const {getRootProps,getInputProps}=useDropzone({
        accept:"image/*",
        onDrop: (acceptedFiles => {
            if(acceptedFiles.length>0) {
                acceptedFiles.map((file)=>{
                    var image = new Image();
                    image.src=URL.createObjectURL(file);
                    image.onload=()=>{
                        if( !(minWidth<=image.width<=maxWidth) || !(minHeight<=image.height<=maxHeight)){
                            setDisplayErrorModal(true);
                        }
                    };
                });
                setFiles(
                      acceptedFiles.map((file) => Object.assign(file, {
                          preview: URL.createObjectURL(file),
                      })
                      )
                );

                setShowFrom(false);
                setPreView(true);
            }
        }),
    });

    return(

        <div className="modal-form-container d-flex flex-column align-items-center justify-content-center" {...getRootProps()}>
            <input {...getInputProps()}/>
            <FontAwesomeIcon icon={faImage} size={"6x"} className="my-3"/>
            <h3 >Przeciągnij zdjęcia lub filmy</h3>
            <p  className="my-4">Akceptowalne wymiary zdjęcia od: {minWidth}x{minHeight} do: {maxWidth}x{maxHeight} pikseli</p>
            <button className="form-submit my-2 w-auto">Wybierz z komputera</button>
            <Error_modal
                display={displayErrorModal}
                toggle={setDisplayErrorModal}
                errorMessage={`Akceptowalne wymiary zdjęcia od: ${minWidth}x ${minHeight} do: ${maxWidth}x${maxHeight} pikseli`}
                killCallback={closeForm}
            />
        </div>

    );
}
export default Image_form;
