import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Edit_profile_photo() {

    const [displayModal,setDisplayModal]=useState(false);


    const headerStyle={
        fontWeight: "bold",
        fontSize: "small",
        color:"blue",
        cursor:"pointer!important",
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
            <h6 style={headerStyle} onClick={toggleModal} className="mx-2 my-0">Zmien zdjęcie profiliowe</h6>
            {displayModal &&
            <div className="modal-overlay" style={ModalStyle} onClick={toggleModal}>
                <div className="d-flex justify-content-center align-items-center h-100 "  >
                    <div style={{width:"25%",height:"25%"}} className="content d-flex flex-column align-items-center p-4 bg-white px-5"  onClick={(event => {event.stopPropagation()})}>
                        <h5 className="fw-bold">Zmień zdjęcie profilowe</h5>
                        <span className="h6 fw-bold my-3 cursor-pointer">Dodaj zdjęcie</span>
                        <span className="h6 fw-bold my-3 cursor-pointer">Usuń obecne zdjęcie</span>
                        <span className="my-2 cursor-pointer" onClick={toggleModal}> Anuluj</span>

                    </div>
                </div>
            </div>
            }
        </>
    );

}

ReactDOM.render(<Edit_profile_photo/>,document.querySelector('#Edit-profile-photo'));
