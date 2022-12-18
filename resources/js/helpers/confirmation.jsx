import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestion,faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';

/**
 * display action-confirm modal
 * @component
 * @param {function} toggle; toggle modal display function
 * @param {boolean} display; boolean for displaying modal
 * @param {function} setResult; callback function for setting confirmation status
 * @returns {null| <Confirmation>}
 */

function Confirmation({toggle,display,setResult}) {
    if(!display){return null;}
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
                    <button type="button" onClick={()=>{toggle(false);setResult(true);}} className=" btn btn-success mx-2">
                         <FontAwesomeIcon icon={faCheck} size={"lg"}/> Tak
                    </button>
                    <button type="button" onClick={()=>{toggle(false);setResult(false);}} className=" btn btn-danger mx-2">
                         <FontAwesomeIcon icon={faXmark} size={"lg"}/> Nie
                    </button>
                </div>

            </div>
        </div>
    </div>);



}

export default Confirmation;
