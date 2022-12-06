import React,{useState,useEffect} from 'react';
import Post_author from "./post_author";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faLayerGroup} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Post_comment(param) {
    const[counter,setCounter]=useState(param.data.comment.like_count);
    const[liked,setLiked]=useState(param.data.comment.liked);
    const commentAuthorIcon={
        width: "45px",
        height: "45px",
        borderRadius: "100%",
        border: "1px solid transparent",
        flex:"right",
    };
    const commentLikeBtn={
        width: "24px",
        height:"24px",
        transform: "scale(0.7)",
        justifyContent:"end",
        cursor:"pointer",
    };
    var likeBtn={};
    liked === false ? null : likeBtn={color:"red"};
    console.log(param.data.comment);
    const refreshLikeCount=()=>{
        axios.get(posts.postCommentsLikeGateWay + "/" + param.data.comment.id)
            .then(res=>{
                if(res.data.like_count !== null && res.data.like_count !== undefined){
                    setCounter(res.data.like_count);
                    setLiked(res.data.liked);
                }
            });
    };

    const likeComment=()=>{
        const formData = new FormData();
        formData.append('_token', userInfo.csrf);
        axios.post(posts.postCommentsLikeGateWay + "/" + param.data.comment.id, formData)
            .then(() => {
                refreshLikeCount();
            });
    };
    console.log(param.data);
    return(
        <div className="d-flex flex-row position-relative my-1">
            <div className="d-flex flex-row justify-content-between w-100 align-items-center" style={{padding:"0 20px 0 0"}}>
                <img src={param.storage+'/'+param.data.author.image} style={commentAuthorIcon}/>
                <div className="d-flex flex-column w-75">
                    <div className="d-flex flex-row">
                        <h6 className="my-0">{param.data.author.username}</h6>
                        <p className="mx-2 my-0">{param.data.comment.content}</p>
                    </div>
                    <div><span style={{fontSize:"12px",fontWeight:"600",color:"rgb(217, 217, 217)"}}>Polubień: {counter}</span></div>

                </div>
                <FontAwesomeIcon onClick={likeComment} style={{...commentLikeBtn,...likeBtn}} icon={faHeart}/>

            </div>

        </div>
    );

}
export default Post_comment;
