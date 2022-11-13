import React,{useState} from 'react';


function SendForm(props) {

    if(!props.show) return null;
    const[message,setMessage]=useState('');
    const handleDescription=event=>{
        setMessage(event.target.value);
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
        }).then(function(res){console.log(res) });
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
        </div>
    );

}
export default SendForm;
