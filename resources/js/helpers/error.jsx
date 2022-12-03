import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBomb} from '@fortawesome/free-solid-svg-icons';

function Error_modal(param) {

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
        fontWeight:"400"
    };

    const close=()=>{
       param.toggle();
       if(param.killCallback !== null){
           param.killCallback()
       }
    };
    useEffect(()=>{
        const timeout = setTimeout(() => {
            close();
        }, 5000);

        return () => clearTimeout(timeout);
    },[]);

    return(
        <div className="modal-overlay" style={ModalStyle}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="d-flex w-25 h-50 justify-content-center align-items-center flex-column " style={modalBodyStyle}>
                    <FontAwesomeIcon icon={faBomb} size={"6x"}/>
                    <h2 style={headersStyle}  className="my-2">Upss</h2>
                    <h3 style={headersStyle} >Coś poszło nie tak :/</h3>
                    <button onClick={close} className="my-2 w-50 form-submit">Rozumiem</button>
                </div>
            </div>
        </div>
    );

}
export default Error_modal;
