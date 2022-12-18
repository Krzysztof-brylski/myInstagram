import React,{useState} from 'react';
import Error_modal from "../../../helpers/error";
import Success_modal from "../../../helpers/success";
import axios from "axios";

/**
 * displaying last stage of adding posts
 * adding post description and sending create request
 * @component
 * @param {boolean} display; boolean for displaying image form
 * @param {Array} files; Array with files
 * @param {function} killModal; function closing modal
 * @returns {null| <Send_form>}
 */
function Send_form({display,files,killModal}) {
    if(!display) return null;

    const[message,setMessage]=useState('');
    const[displayError,setDisplayError]=useState(false);
    const[errorMessage,setErrorMessage]=useState(null);
    const[displaySuccess,setDisplaySuccess]=useState(false);


    const handleDescription=event=>{
        setMessage(event.target.value);
    };

    const ErrorModalToggle=()=>{
        setDisplayError(!displayError);
    };
    const SuccessModalToggle=()=>{
        setDisplaySuccess(!displaySuccess);
    };
    const submit=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        files.map((file)=>{
            formData.append('files[]',file);
        });
        formData.append('content',message);

        axios.post(posts.postsGateWay,formData)
            .then(function(res){
                if(res.status === 201){
                    SuccessModalToggle();
                }
            })
            .catch((error)=>{
                setErrorMessage(Object.values(error.response.data)[0][0]);
                ErrorModalToggle();
            })
    };

    return(
        <div className="mx-3">
            <div className='searching-result-container d-flex my-2'>
                <div className="mx-2">
                    <img src={storage+'/'+userInfo.userPhoto} className="searching-result-img" width="50px" height="50px"/>
                </div>
                <div className="d-flex align-items-center">
                    <h5>{userInfo.userName}</h5>
                </div>
            </div>
            <form className="h-50">
                <textarea style={{width:"100%",height:"100%",borderRadius:"5px"}} maxLength={2000} onChange={handleDescription}>

                </textarea>
                <button className="form-submit" type='button' onClick={submit}>Udostępnij</button>
            </form>
            <Error_modal display={displayError} toggle={ErrorModalToggle} errorMessage={errorMessage} />
            <Success_modal display={displaySuccess} toggle={SuccessModalToggle}  killCallback={killModal}/>

        </div>

    );

}
export default Send_form;
