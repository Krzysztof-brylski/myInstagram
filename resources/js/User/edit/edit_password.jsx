import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Edit_password() {

    const [displayModal,setDisplayModal]=useState(true);
    const [oldPass,setOldPass]=useState("");
    const [newPass,setNewPass]=useState("");
    const [newRepPass,setNewRepPass]=useState("");

    const oldPassHandler=(event)=>{
        setOldPass(event.target.value);
    };
    const newPassHandler=(event)=>{
        setNewPass(event.target.value);
    };
    const newRepPassHandler=(event)=>{
        setNewRepPass(event.target.value);
    };
    const send=()=>{
        console.log(oldPass,newPass,newRepPass);
    };



    const ModalStyle={
        inset:`${window.scrollY}px 0 0 0 `,
        zIndex:"9999999",
    };

    const toggleModal=()=>{
        setDisplayModal(!displayModal);
        if(!displayModal){
            document.body.style.overflowY="hidden";
        }else{
            document.body.style.overflowY="scroll";
        }
    };



    return(
        <>
            <button className="btn btn-primary" onClick={toggleModal}>Do zmiany hasła</button>
            {displayModal &&
            <div className="modal-overlay" style={ModalStyle} onClick={toggleModal}>
                <div className="d-flex justify-content-center align-items-center h-100 ">
                    <div className="d-flex flex-column content align-items-center p-5 h-50 w-50 bg-white" onClick={(event => {event.stopPropagation()})}>
                        <h4>Zmiana hasła</h4>
                        <div className="d-flex my-3 flex-row align-items-center w-100">
                            <span className="h6 fw-bold m-0 w-25">Stare hasło</span>
                            <input name="oldPassword" className="m-0 w-75 form-input" type="password" onChange={oldPassHandler} />
                        </div>

                        <div className="d-flex my-3  flex-row align-items-center w-100">
                            <span className="h6 fw-bold m-0 w-25">Nowe hasło</span>
                            <input name="newPassword" className="m-0 w-75 form-input" type="password" onChange={newPassHandler} />
                        </div>

                        <div className="d-flex my-3  flex-row align-items-center w-100">
                            <span className="h6 fw-bold m-0 w-25">Potwierdz nowe hasło</span>
                            <input name="newRepPassword" className="m-0 w-75 form-input" type="password" onChange={newRepPassHandler} />
                        </div>
                        <button className="btn btn-primary" type="button" onClick={send}>Zmień</button>
                    </div>
                </div>
            </div>
            }
        </>
    );

}

ReactDOM.render(<Edit_password/>,document.querySelector('#Edit_password'));
