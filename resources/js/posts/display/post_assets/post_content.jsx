import React,{useState,useEffect} from 'react';

function Post_content(param) {
    return(
        <div><p>{param.data.content}</p></div>
    )
}
export default Post_content;
