import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Image_preview from './image_preview'
import axios from "axios";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Error_modal from "../../helpers/error";
import Success_modal from "../../helpers/success";


function Edit_profile_photo() {

    const [displayModal,setDisplayModal]=useState(false);
    const [file,setFile]=useState(null);
    const[displayError,setDisplayError]=useState(false);
    const[displaySuccess,setDisplaySuccess]=useState(false);
    const headerStyle={
        fontWeight: "bold",
        fontSize: "small",
        color:"blue",
        cursor:"pointer!important",
    };

    const ModalStyle={
        inset:`${window.scrollY}px 0 0 0 `,
        zIndex:"9999",
    };

    const toggleModal=()=>{
        setDisplayModal(!displayModal);
        if(!displayModal){
            document.body.style.overflowY="hidden";
        }else{
            document.body.style.overflowY="scroll";
        }
    };
    const handleFile=()=>{
        setFile(document.getElementById("fileInput").files[0]);
    };
    const resetImage=()=>{
      let formData= new FormData();
      formData.append("_token",userInfo.csrf);
      axios.post(userImageDeleteGateWay,formData).then((response)=>{
          console.log(response);
          if(response.status === 200){
              setDisplayModal(false);
              setDisplaySuccess(true);
          }
          else{
              setDisplayModal(false);
              setDisplayError(true);
          }
      });
    };
    const ErrorModalToggle=()=>{
        setDisplayError(!displayError);
    };
    const SuccessModalToggle=()=>{
        setDisplaySuccess(!displaySuccess);
    };
    return(
        <>
            <h6 style={headerStyle} onClick={toggleModal} className="mx-2 my-0 cursor-pointer">Zmien zdjęcie profiliowe</h6>
            {displayModal &&
            <div className="modal-overlay" style={ModalStyle} onClick={(event => {event.stopPropagation()})}>
                <div className="d-flex justify-content-center align-items-center h-100 "  >
                    <div style={{width:"25%",height:"25%"}} className="content d-flex flex-column align-items-center p-4 bg-white px-5"  >
                        <h5 className="fw-bold">Zmień zdjęcie profilowe</h5>
                        <span className="h6 fw-bold my-3 cursor-pointer "  style={{color:"#0d6efd"}} onClick={()=>{document.getElementById("fileInput").click()}}>Dodaj zdjęcie</span>
                        <span className="h6 fw-bold my-3 cursor-pointer " style={{color:"#dc3545"}} onClick={resetImage}>Usuń obecne zdjęcie</span>
                        <span className="my-2 cursor-pointer" onClick={toggleModal}> Anuluj</span>
                    </div>
                    <input type="file" id="fileInput" onChange={handleFile} hidden/>
                    {file !== null && <Image_preview
                        image={file} setFile={setFile}
                        setDisplayError={setDisplayError}
                        setDisplayModal={setDisplayModal}
                        setDisplaySuccess={setDisplaySuccess}/>
                    }
                </div>
            </div>
            }
            <Error_modal display={displayError} toggle={ErrorModalToggle} killCallback={()=>{setFile(null);location.reload();}}/>
            <Success_modal display={displaySuccess} toggle={SuccessModalToggle}  killCallback={()=>{setFile(null);location.reload();}}/>
        </>
    );

}

ReactDOM.render(<Edit_profile_photo/>,document.querySelector('#Edit-profile-photo'));
