import React,{useState} from 'react';
import Modal from "../../posts/add/add_post_modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons";

/**
 * displaying information about user have no posts
 * @param {boolean} self; true if component is displaying on auth user profile
 * @returns {<No_user_posts>}
 *
 */
function No_user_posts({self}) {

    let info = (<p>gdy zdjęcie zostanie udostępnione pojawi się tutaj</p>);

    if(self){
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
            <p className="my-3 cursor-pointer" style={{color:"blue",cursor:"pointer"}} onClick={toggleModal}>Dodaj swoje pierwsze zdjęcie</p>
            <Modal display={OpenModal} onClose={toggleModal}/>
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
