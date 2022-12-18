import React,{useState,useEffect} from 'react';
import Post_comment from  "./post_comment";
import axios from "axios";

/**
 * displaying post comments container
 * @component
 * @param {Object} data; Object with post data
 * @returns {<Post_comments>}
 */

function Post_comments({data}) {

    return(
        <div className="d-flex flex-column " style={{height:"320px",maxHeight:"320px",overflowY:"scroll"}}>
            {
                data.map((data)=>{return <Post_comment data={data} />})
            }
        </div>
    );

}
export default Post_comments;
