import React,{useState,useEffect} from 'react';
import axios from "axios";




function Add_comment(props) {

    const[comment,setComment]=useState('');
    const handleDescription=event=>{
        setComment(event.target.value);
    };


    const containerStyle={
      borderTop:"solid rgb(217, 217, 217) 1px",
    };
    const inputStyle={
      outline:"none",
      border:"none",
    };

    const btnStyle={
      fontWeight:"bold",
      cursor:"pointer",
      color:"#0095f6",
    };

    const btnAddComment=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        formData.append('comment',comment);
        axios.post(posts.postCommentsGateWay+"/"+props.post_id,formData)
            .then();
    };

    return(<div  style={containerStyle} className="d-flex flex-row px-3 py-3 justify-content-center">
        <input onChange={handleDescription} maxLength="200" style={inputStyle} className="w-100" type="text" placeholder="Dodaj komentarz"/>
        <span onClick={btnAddComment}  style={btnStyle} className="px-1">Opublikuj</span>
    </div>);

}

export default Add_comment;
