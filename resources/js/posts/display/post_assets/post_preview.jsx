import React,{useState,useEffect} from 'react';
import Post_slider from "./post_slider";
import Post_author from "./post_author";
import Post_content from "./post_content";
import Post_btns from "./post_btns";
import Post_comments from  './post_comments';
import Add_comment from  './add_post_comment';
import axios from "axios";
import useAxios from "axios-hooks";
import Loading_screen from "../../../helpers/loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

/**
 * displaying post preview modal with all components
 * @component
 * @param {boolean} display; boolean for displaying image preview
 * @param {Object} postData; Object with post data
 * @param {Object} style; Object with modal style
 * @param {function} onClose; function closing modal
 * @returns {null|<Post_comments>}
 */
function Post_preview({display,postData,style,onClose}) {
    if(!display){return null;}


    const [{ data, loading, error }, refetch] = useAxios(posts.postCommentsGateWay+"/"+postData.post_id);


    return (
        <div className="modal-overlay" style={style}>

            <div className="modal-close-btn-container" style={{top:"0"}}>
                <p onClick={onClose} className="modal-close-btn m-3">
                    <FontAwesomeIcon icon={faXmark} size={"3x"} style={{color:"white",cursor:"pointer"}}/>
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">
                {loading == true ?  <Loading_screen color="white" size="100px"/> : (
                <div className="content" style={{height:"550px"}} onClick={(event => {event.stopPropagation()})}>
                    <div className="row" >
                        <div className="col-xl-7" style={{width:"550px",height:"550px"}}>
                            <Post_slider  data={postData} preview={true}/>
                        </div>
                        <div className="col-xl-5" style={{width:"500px",paddingLeft:"0px"}}>
                            <Post_author data={postData}/>
                            <Post_btns  data={postData} togglePostModal={null}/>
                            <Post_content data={postData} />
                            <Post_comments data={data}/>
                            <Add_comment post_id={postData.post_id} refreshComments={refetch}/>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );


}

export default Post_preview;
