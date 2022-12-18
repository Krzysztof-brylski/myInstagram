import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import Add_post_modal from './add_post_modal';

/**
 * rendering add post button
 * @returns {null}
 */
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
                <Add_post_modal display={OpenModal} onClose={toggleModal} />
            </div>
    );
}
ReactDOM.render(<Add_post/>,document.querySelector('#add-post-btm'));
