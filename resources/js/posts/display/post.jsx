import React,{useState,useEffect} from 'react';
import axios from "axios";
function Post(param) {
    //styles
    const[counter,setCounter]=useState(param.data.like_count);
    const[liked,setLiked]=useState(param.data.liked);
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
    var likeBtn={};
    liked ===false ? null : likeBtn={fill:"red"};
    const refreshLikeCount=()=>{
            axios.get(userInfo.postsLikeCounterGateWay+"/"+param.data.post_id)
                .then(res=>{
                    if(res.data.like_count !== null && res.data.like_count !== undefined){
                        setCounter(res.data.like_count);
                        setLiked(res.data.liked);
                        console.log(res.data);
                    }
                });
    };
    //likebtn
    const like=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        axios.post(userInfo.postsLikeGateWay+"/"+param.data.post_id,formData);
        refreshLikeCount();
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
                <div><svg onClick={like} style={likeBtn} width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg></div>
                <div>
                    <div className="my-2"><strong>Liczba polubień: </strong> {counter}</div>
                    <div><p>{param.data.content}</p></div>
                </div>
            </div>
        </div>
    );
}

export default Post;
