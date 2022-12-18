import React, {useState} from 'react';
import Post_preview from "../../posts/display/post_assets/post_preview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLayerGroup} from '@fortawesome/free-solid-svg-icons'
import Post_hover from "./post_hover";

/**
 * displaing post thumbnail
 * @component
 * @param {object} data; object with post data
 * @returns {null|<Post_thumbnail>}
 */
function Post_thumbnail({data}) {
    if(data == null){return null;}
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

    console.log(data)

    const gallery=(<div className="position-absolute d-flex justify-content-end w-100 p-2">
        <FontAwesomeIcon icon={faLayerGroup} size={"lg"}/>
    </div>);
    let icon=(<p className="position-absolute"> </p>);
    data.images.length >1 ? icon=gallery:null;

    return(
        <div className="col-xl-4  m-4 p-0 cursor-pointer" style={thumbnailStyle}  onClick={togglePostModal}>
            <div className="position-relative w-100 h-100"
                 onMouseEnter={()=>{setShowHover(true);}}
                 onMouseLeave={()=>{setShowHover(false);}}
            >
                {icon}
                <img src={storage+"/"+data.images[0]} style={thumbnailStyle}/>
                <Post_hover display={showHover} like_count={data.like_count} />
            </div>

            <Post_preview display={showPreview} onClose={togglePostModal} style={postModalStyle} storage={storage} postData={data}/>
        </div>);

}

export default Post_thumbnail;
