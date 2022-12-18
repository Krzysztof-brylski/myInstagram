import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Confirmation from "../../../helpers/confirmation";


/**
 * displaing post author component
 * @component
 * @param {Object} data; Object with post data
 * @returns {<Post_author>}
 */

function Post_author({data}) {
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
                formData.append('post_id',data.post_id);
                axios.post(posts.postsDeleteGateWay,formData);
                window.location.reload();
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
                <a href={user_show_url+'/'+data.author.id} className="w-100 h-100 pointer-svg">
                    <img src={storage+'/'+data.author.image} className="searching-result-img" width="50px" height="50px"/>
                </a>
            </div>
            <div className="d-flex justify-content-between w-75">
                <h6>{data.author.username}</h6>
                {
                    data.author.id===parseInt(userInfo.userId) &&
                    (<FontAwesomeIcon onClick={()=>{setClicked(true)}} className="pointer-svg"  icon={faTrashCan} size={"lg"}/>)
                }
            </div>
            <Confirmation display={display} toggle={setDisplay} setResult={setResult}/>
        </div>

    )

}
export default Post_author;
