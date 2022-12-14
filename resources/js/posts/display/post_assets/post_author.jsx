import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Confirmation from "../../../helpers/confirmation";
function Post_author(param) {
    const [display,setDisplay]=useState(false);
    const [result,setResult]=useState(null);
    const [clicked,setClicked]=useState(false);
    const postAuthorContainer={
        display:"flex",
        alignItems:"center",
        borderBottom: "1px solid rgb(217,217,217)"
    };

    useEffect(()=>{

        if(result !== null){
            if(result){
                const formData = new FormData();
                formData.append('_token',userInfo.csrf);
                formData.append('user_id',userInfo.userId);
                formData.append('post_id',param.data.post_id);
                axios.post(posts.postsDeleteGateWay,formData);
            }

            setResult(null);
        }
        if(clicked){
            setDisplay(true);
            setClicked(false);
        }
    },[clicked,result]);
    return(
        <div style={postAuthorContainer} className="py-2" >
            <div className="mx-2">
                <a href={user_show_url+'/'+param.data.author.id} className="w-100 h-100 pointer-svg">
                    <img src={param.storage+'/'+param.data.author.image} className="searching-result-img" width="50px" height="50px"/>
                </a>
            </div>
            <div className="d-flex justify-content-between w-75">
                <h6>{param.data.author.username}</h6>
                {
                    param.data.author.id===parseInt(userInfo.userId) &&
                    (<FontAwesomeIcon onClick={()=>{setClicked(true)}} className="pointer-svg"  icon={faTrashCan} size={"lg"}/>)
                }
            </div>
            <Confirmation display={display} toggle={setDisplay} setResult={setResult}/>
        </div>

    )

}
export default Post_author;
