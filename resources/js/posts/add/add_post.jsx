import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import Modal from './add_post_modal';

function Add_post(){
    const [OpenModal,setOpenModal]=useState(false);
    const toggleModal = () => {
        setOpenModal(!OpenModal);
        if(!OpenModal){
            document.body.style.overflowY="hidden";
        }else{
            document.body.style.overflowY="scroll";
        }
    };
    return(
            <div onClick={toggleModal}>
                <FontAwesomeIcon className="pointer-svg" icon={faSquarePlus} size={"2x"}/>
                <Modal open={OpenModal} onClose={toggleModal} userInfo={userInfo}/>
            </div>
    );
}
ReactDOM.render(<Add_post/>,document.querySelector('#add-post-btm'));
