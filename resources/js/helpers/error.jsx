import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBomb} from '@fortawesome/free-solid-svg-icons';

/**
 * display error modal with or without error message
 * @component
 * @param {boolean} display; boolean for displaying modal
 * @param {function} toggle; toggle modal display function
 * @param {string} [errorMessage = null]; error message displayed inside error modal
 * @param {function} [killCallback = null]; this callback is used to close parent modal
 * @returns {null| <Error_modal>}
 *
 */


function Error_modal({display,toggle,errorMessage=null,killCallback=null,}) {

    if(!display){return null;}
    const modalBodyStyle={
      backgroundColor:"white",
      border:"solid 1px transparent",
      borderRadius:"15px"
    };
    const ModalStyle={
        inset:`${window.scrollY}px 0 0 0 `,
        zIndex:"999999999999"
    };
    const headersStyle={
        fontWeight:"400"
    };
    const errorMessageStyle={
        color:"#d9534f",
        textAlign:"center",
        fontWeight:"600",
        wordBreak:"wordBreak",
    };

    const close=()=>{
       toggle();
       if(killCallback !== null){
           killCallback()
       }
    };
    useEffect(()=>{
        const timeout = setTimeout(() => {
            close();
        }, 5000);

        return () => clearTimeout(timeout);
    },[]);
    return(
        <div className="modal-overlay" style={ModalStyle} onClick={(event => {event.stopPropagation()})}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="d-flex w-25 h-50 justify-content-center align-items-center flex-column " style={modalBodyStyle}>
                    <FontAwesomeIcon icon={faBomb} size={"6x"}/>
                    <h2 style={headersStyle}  className="my-2">Upss</h2>
                    <h3 style={headersStyle} >Coś poszło nie tak :/</h3>
                    { errorMessage !== null && <p className="my-1 px-3" style={errorMessageStyle}> {errorMessage} </p>}
                    <button type="button" onClick={close} className="my-2 w-50 form-submit">Rozumiem</button>
                </div>
            </div>
        </div>
    );

}
export default Error_modal;
