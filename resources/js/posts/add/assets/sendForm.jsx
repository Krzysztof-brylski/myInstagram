import React,{useState} from 'react';
import Error_modal from "../../../helpers/error";
import Success_modal from "../../../helpers/success";


function SendForm(props) {

    if(!props.show) return null;
    const[message,setMessage]=useState('');
    const[displayError,setDisplayError]=useState(false);
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
        //console.log(props.url);
        const formData = new FormData();
        formData.append('_token',props.userInfo.csrf);
        for(let i=0;i<props.files.length;i++){
            formData.append('files[]',props.files[i]);
        }
        formData.append('content',message);
         fetch('http://127.0.0.1:8000/post/',{
             method: 'POST',
             body: formData
        }).then(function(res){
            if(res.status === 201){
                SuccessModalToggle();
            }else{
                ErrorModalToggle();
            }
        });
    };

    return(
        <div className="mx-3">
            <div className='searching-result-container d-flex my-2'>
                <div className="mx-2">
                    <img src={userInfo.storage+'/'+userInfo.userPhoto} className="searching-result-img" width="50px" height="50px"/>
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
            <Error_modal display={displayError} toggle={ErrorModalToggle} killCallback={null}/>
            <Success_modal display={displaySuccess} toggle={SuccessModalToggle}  killCallback={props.killModal}/>

        </div>

    );

}
export default SendForm;
