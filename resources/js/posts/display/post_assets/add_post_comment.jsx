import React,{useState,useEffect} from 'react';
import axios from "axios";


/**
 *
 * displaying adding comment form
 * and sending add comment request
 * @component
 * @param {int} post_id;
 * @param {function} refreshComments;
 * @returns {<Add_comment/>}
 */

function Add_comment({post_id,refreshComments}) {

    const[comment,setComment]=useState('');
    const handleDescription=event=>{
        setComment(event.target.value);
    };

    const containerStyle={
      borderTop:"solid rgb(217, 217, 217) 1px",
        zIndex:44,
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

    const btnAddComment=event=>{
        if(comment != "") {
            const formData = new FormData();
            formData.append('_token', userInfo.csrf);
            formData.append('comment', comment);
            formData.append('post_id',post_id);
            axios.post(posts.commentPostGateWay+"/", formData)
                .then(() => {

                });
        }
        setComment('');
        document.querySelector("#inputComment").value='';
        refreshComments();
    };


    return(<div  style={containerStyle} className="d-flex flex-row px-3 py-3 justify-content-center">
        <input id="inputComment" onChange={handleDescription} maxLength="200" style={inputStyle} className="w-100" type="text" placeholder="Dodaj komentarz"/>
        <span onClick={btnAddComment}  style={btnStyle} className="px-1">Opublikuj</span>
    </div>);

}

export default Add_comment;
