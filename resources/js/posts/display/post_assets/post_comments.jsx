import React,{useState,useEffect} from 'react';
import Post_comment from  "./post_comment";
import axios from "axios";


function Post_comments(param) {
    const[data,setData]=useState([]);
    useEffect(()=>{
        axios.get(posts.postCommentsGateWay+"/"+param.post_id)
            .then(res=>{setData(Object.values(res.data))});
    },[]);

    console.log(data);
    return(
        <div className="d-flex flex-column overflowY-scroll">
            {
                data.map(x=>{return <Post_comment data={x} storage={storage}/>})
            }
        </div>
    );

}
export default Post_comments;
