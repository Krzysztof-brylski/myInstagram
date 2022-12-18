import React,{useState,useEffect} from 'react';
import Image_form from  "./assets/image_form"
import Preview from  "./assets/previev"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

/**
 *  displaying add post modal container
 * @param {boolean} display;  boolean for displaying image form
 * @param {function} onClose; function closing modal
 * @returns {null|<Add_post_modal>}
 * @constructor
 */
const Add_post_modal = ({display,onClose}) =>{
    if(!display) return null;

    const [files,setFiles]=useState({});
    const [showFrom,setFormShow]=useState(true);
    const [preView,setPreView]=useState(false);
    const[showSendForm,setShowSendForm]=useState(false);
    let size={width:"35%"};
    if(showSendForm){
        size={width:"60%"};
    }

    const postModalStyle={
        inset:`${window.scrollY}px 0 0 0 `
    };
    return(
        <div className="modal-overlay" style={postModalStyle}>
            <div className="modal-close-btn-container">
                <p onClick={onClose} className="modal-close-btn m-3">
                    <FontAwesomeIcon icon={faXmark} size={"3x"} style={{color:"white",cursor:"pointer"}}/>
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="content" style={size}  onClick={(event => {event.stopPropagation()})}>
                    <div className="modal-header d-flex justify-content-center p-1">
                        <h5 className="text-center">Utwórz nowy post</h5>
                    </div>
                    <Image_form  setFiles={setFiles} display={showFrom} setShowFrom={setFormShow} setPreView={setPreView} closeForm={onClose}/>
                    <Preview display={preView} files={files} setFiles={setFiles} sendForm={showSendForm} showSendForm={setShowSendForm} killModal={onClose} />
                </div>
            </div>
        </div>
    )
};

export default Add_post_modal;
