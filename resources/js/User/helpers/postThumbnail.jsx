import React, {useState} from 'react';
import Post_preview from "../../posts/display/post_assets/post_preview";
import Post_hover from "./post_hover";
function Post_thumbnail(param) {
    if(param.data == null){return null;}
    const[showPreview,setShowPreview]=useState(false);
    const[showHover,setShowHover]=useState(false);
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
    const thumbnailStyle={
      width:"300px",
      height:"300px",
    };



    const gallery=(<p className="position-absolute">xd</p>);
    let icon=(<p className="position-absolute"> </p>);
    param.data.images.length >1 ? icon=gallery:null;

    return(
        <div className="col-xl-4  m-4 p-0" style={thumbnailStyle}   onClick={togglePostModal}>
            <div className="position-relative w-100 h-100"
                 onMouseEnter={()=>{setShowHover(true);}}
                 onMouseLeave={()=>{setShowHover(false);}}
            >
                {icon}
                <img src={storage+"/"+param.data.images[0]} style={thumbnailStyle}/>
                <Post_hover display={showHover} like_count={param.data.like_count} />
            </div>

            <Post_preview show={showPreview} onClose={togglePostModal} style={postModalStyle} storage={storage} data={param.data}/>
        </div>);

}

export default Post_thumbnail;