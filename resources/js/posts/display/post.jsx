import React,{useState,useEffect} from 'react';
import axios from "axios";
function Post(param) {
    //styles
    const postContainer={
        width:"35%",
        border:"1px rgb(217,217,217) solid",
        borderRadius:"8px",
        backgroundColor:"white",
    };
    const postAuthorContainer={
        display:"flex",
        alignItems:"center",
        borderBottom: "1px solid rgb(217,217,217)"
    };
    const postImage={
        padding:"1px",
        width:"inherit",
        height:"inherit",

    };

    //likebtn
    const like=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        axios.post(userInfo.postsLikeGateWay+"/"+param.data.post_id,formData);
    };

    return(
        <div style={postContainer} className="my-2">
            <div style={postAuthorContainer} className="py-2">
                <div className="mx-2">
                    <img src={param.storage+'/'+param.data.author.image} className="searching-result-img" width="50px" height="50px"/>
                </div>
                <div className="d-flex align-items-center">
                    <h6>{param.data.author.username}</h6>
                </div>
            </div>
            <div className="w-100">
                <img style={postImage}  src={param.storage+'/'+param.data.images[0]}/>
            </div>
            <div className="p-2">
                <div><strong onClick={like}>XDDD</strong> </div>
                <div>
                    <div className="my-2"><strong>Liczba polubień: </strong> {param.data.like_count}</div>
                    <div><p>{param.data.content}</p></div>
                </div>
            </div>
        </div>
    );
}

export default Post;
