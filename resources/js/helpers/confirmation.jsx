import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestion,faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';


function Confirmation(param) {
    if(!param.display){return null;}
    const modalBodyStyle={
        backgroundColor:"white",
        border:"solid 1px transparent",
        borderRadius:"15px"
    };
    const ModalStyle={
        inset:`${window.scrollY}px 0 0 0 `,
        zIndex:"9999999"
    };
    const headersStyle={
        textAlign:"center",
        fontWeight:"400"
    };

    return(<div className="modal-overlay" style={ModalStyle}>
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="d-flex w-25 h-50 justify-content-center align-items-center flex-column " style={modalBodyStyle}>
                <FontAwesomeIcon icon={faQuestion} size={"6x"}/>
                <h2 style={headersStyle}  className="my-2">Czy napewno chcesz to zrobić ?</h2>
                <div className="d-flex flex-row-reverse justify-content-center  w-100 my-3">
                    <button onClick={()=>{param.toggle(false);param.setResult(true);}} className=" btn btn-success mx-2">
                         <FontAwesomeIcon icon={faCheck} size={"lg"}/> Tak
                    </button>
                    <button onClick={()=>{param.toggle(false);param.setResult(false);}} className=" btn btn-danger mx-2">
                         <FontAwesomeIcon icon={faXmark} size={"lg"}/> Nie
                    </button>
                </div>

            </div>
        </div>
    </div>);



}

export default Confirmation;
