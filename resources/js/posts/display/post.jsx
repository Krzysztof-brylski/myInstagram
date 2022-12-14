import React,{useState,useEffect} from 'react';
import Post_author from "./post_assets/post_author";
import Post_slider from "./post_assets/post_slider";
import Post_btns from "./post_assets/post_btns";
import Post_content from "./post_assets/post_content";
import Post_preview from './post_assets/post_preview'

function Post(param) {

    const[showPreview,setShowPreview]=useState(false);

    const postContainer={
        width:"35%",
        border:"1px rgb(217,217,217) solid",
        borderRadius:"8px",
        backgroundColor:"white",
    };

    const postModalStyle={
        inset:`${window.scrollY}px 0 0 0 `
    };


    const togglePostModal=()=>{
        setShowPreview(!showPreview);
        if(!showPreview){
            document.body.style.overflowY="hidden";
        }else{
            document.body.style.overflowY="scroll";
        }
    };


    return(
        <div style={postContainer} className="my-2">
            <Post_author storage={param.storage} data={param.data} preview={false}/>
            <Post_slider storage={param.storage} data={param.data}/>
            <div className="p-2">
                <Post_btns data={param.data} togglePostModal={togglePostModal}/>
                <Post_content data={param.data} />
            </div>
            <Post_preview show={showPreview} onClose={togglePostModal} style={postModalStyle} storage={param.storage} data={param.data}/>
        </div>
    );
}

export default Post;
