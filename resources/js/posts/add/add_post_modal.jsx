import React,{useState,useEffect} from 'react';
import ImageForm from  "./assets/form"
import Preview from  "./assets/previev"

const Modal = ({open,onClose}) =>{
    if(!open) return null;

    const [files,setFiles]=useState({});
    const [showFrom,setFormShow]=useState(true);
    const [preView,setPreView]=useState(false);
    const[showSendForm,setShowSendForm]=useState(false);
    let size={width:"40%"};
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
                    <svg aria-label="Zamknij" className="x1n2onr6 x1lliihq" color="#ffffff" fill="#ffffff" height="18"
                         role="img" viewBox="0 0 24 24" width="18"><title>Zamknij</title>
                        <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor"
                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline>
                        <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                    </svg>
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="content" style={size}  onClick={(event => {event.stopPropagation()})}>
                    <div className="modal-header d-flex justify-content-center p-1">
                        <h5 className="text-center">Utwórz nowy post</h5>
                    </div>
                    <ImageForm  setFiles={setFiles} show={showFrom} showFrom={setFormShow} preView={setPreView}/>
                    <Preview show={preView} files={files} setFiles={setFiles} userInfo={userInfo} sendform={showSendForm} showsendform={setShowSendForm} killModal={onClose} />
                </div>
            </div>
        </div>
    )
};

export default Modal;
