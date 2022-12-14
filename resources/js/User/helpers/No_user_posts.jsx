import React,{useState} from 'react';
import Modal from "../../posts/add/add_post_modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons";

function No_user_posts(param) {

    let info = (<p>gdy zdjęcie zostanie udostępnione pojawi się tutaj</p>);

    if(param.self){
        const [OpenModal,setOpenModal]=useState(false);
        const toggleModal = () => {
            setOpenModal(!OpenModal);
            if(!OpenModal){
                document.body.style.overflowY="hidden";
            }else{
                document.body.style.overflowY="scroll";
            }
        };
        info = (<div className="d-flex flex-column justify-content-center align-items-center text-center">
            Każde udostępione przez ciebie zdjęcie się na twoim profilu
            <p className="my-3" style={{color:"blue",cursor:"pointer"}} onClick={toggleModal}>Dodaj swoje pierwsze zdjęcie</p>
            <Modal open={OpenModal} onClose={toggleModal} userInfo={userInfo}/>
        </div>);
    }
    const hStyle={
      fontWeight:"400",
    };
    return(
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <FontAwesomeIcon icon={faEyeSlash} size={"6x"} className="my-3"/>
            <h2 style={hStyle} >Ups! nie udostępniono rzadnych zdjęc</h2>
            {info}
        </div>

    );

}
export default No_user_posts;
