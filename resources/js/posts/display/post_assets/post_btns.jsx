import React,{useState,useEffect} from 'react';
import axios from "axios";


function Post_btns(param) {
    const[counter,setCounter]=useState(param.data.like_count);
    const[liked,setLiked]=useState(param.data.liked);

    var likeBtn={};
    liked ===false ? null : likeBtn={fill:"red"};
    const refreshLikeCount=()=>{
        axios.get(posts.postsLikeCounterGateWay+"/"+param.data.post_id)
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
        axios.post(posts.postsLikeGateWay+"/"+param.data.post_id,formData);
        refreshLikeCount();
    };

    return(
        <div className="py-2">
            <div className="d-flex">
                <div className="px-1"><svg onClick={like} style={likeBtn} width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg></div>
                <div className="px-1"><svg onClick={param.togglePostModal} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.86 122.88"><title>comment</title><path d="M30.28,110.09,49.37,91.78A3.84,3.84,0,0,1,52,90.72h60a2.15,2.15,0,0,0,2.16-2.16V9.82a2.16,2.16,0,0,0-.64-1.52A2.19,2.19,0,0,0,112,7.66H9.82A2.24,2.24,0,0,0,7.65,9.82V88.55a2.19,2.19,0,0,0,2.17,2.16H26.46a3.83,3.83,0,0,1,3.82,3.83v15.55ZM28.45,63.56a3.83,3.83,0,1,1,0-7.66h53a3.83,3.83,0,0,1,0,7.66Zm0-24.86a3.83,3.83,0,1,1,0-7.65h65a3.83,3.83,0,0,1,0,7.65ZM53.54,98.36,29.27,121.64a3.82,3.82,0,0,1-6.64-2.59V98.36H9.82A9.87,9.87,0,0,1,0,88.55V9.82A9.9,9.9,0,0,1,9.82,0H112a9.87,9.87,0,0,1,9.82,9.82V88.55A9.85,9.85,0,0,1,112,98.36Z"/></svg></div>
            </div>
            <div className="my-2"><strong>Liczba polubień: </strong> {counter}</div>
        </div>

    )

}
export default Post_btns;
