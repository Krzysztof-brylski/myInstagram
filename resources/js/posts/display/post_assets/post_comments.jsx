import React,{useState,useEffect} from 'react';
import Post_comment from  "./post_comment";
import axios from "axios";


function Post_comments({data}) {
    
    return(
        <div className="d-flex flex-column " style={{height:"320px",maxHeight:"320px",overflowY:"scroll"}}>
            {
                data.map(x=>{return <Post_comment data={x} storage={storage}/>})
            }
        </div>
    );

}
export default Post_comments;
