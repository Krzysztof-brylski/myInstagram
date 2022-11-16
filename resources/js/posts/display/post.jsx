import React,{useState,useEffect} from 'react';
import Post_author from "./post_assets/post_author";
import Post_slider from "./post_assets/post_slider";
import Post_btns from "./post_assets/post_btns";
import Post_content from "./post_assets/post_content";

//styles






export function Post(param) {

    const postContainer={
        width:"35%",
        border:"1px rgb(217,217,217) solid",
        borderRadius:"8px",
        backgroundColor:"white",
    };


    return(
        <div style={postContainer} className="my-2">
            <Post_author storage={param.storage} data={param.data}/>
            <Post_slider storage={param.storage} data={param.data}/>
            <div className="p-2">
                <Post_btns data={param.data}/>
                <Post_content data={param.data} />

            </div>
        </div>
    );
}

export default Post;
