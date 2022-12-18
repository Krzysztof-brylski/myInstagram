import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faLayerGroup} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

/**
 * displaying like-post and comment btn
 * sending post like request
 * @component
 * @param {Object} data; Object with post data
 * @param {function} togglePostModal; function displaying post preview
 * @returns {<Post_btns>}
 */
function Post_btns({data, togglePostModal}) {
    const[counter,setCounter]=useState(data.like_count);
    const[liked,setLiked]=useState(data.liked);

    var likeBtn={};
    liked ===false ? null : likeBtn={color:"red"};
    const refreshLikeCount=()=>{
        axios.get(posts.postsLikeCounterGateWay+"/"+data.post_id)
            .then(res=>{
                if(res.data.like_count !== null && res.data.like_count !== undefined){
                    setCounter(res.data.like_count);
                    setLiked(res.data.liked);
                }
            });
    };
//likebtn
    const like=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        axios.post(posts.postsLikeGateWay+"/"+data.post_id,formData);
        refreshLikeCount();
    };

    return(
        <div className="py-2">
            <div className="d-flex">
                <div className="px-1"><FontAwesomeIcon className="pointer-svg" style={likeBtn} onClick={like}  icon={faHeart} size={"2x"}/></div>
                <div className="px-1"><FontAwesomeIcon className="pointer-svg" onClick={togglePostModal} icon={faCommentDots} size={"2x"}/></div>
            </div>
            <div className="my-2"><strong>Liczba polubień: </strong> {counter}</div>
        </div>

    )

}
export default Post_btns;
