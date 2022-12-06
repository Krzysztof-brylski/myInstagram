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

function Post_preview(param) {
    if(param.show === false){return null;}


    const [{ data, loading, error }, refetch] = useAxios(posts.postCommentsGateWay+"/"+param.data.post_id);
    //if (loading) return null;

    return (
        <div className="modal-overlay" style={param.style}>

            <div className="modal-close-btn-container" style={{top:"0"}}>
                <p onClick={param.onClose} className="modal-close-btn m-3">
                    <FontAwesomeIcon icon={faXmark} size={"3x"} style={{color:"white",cursor:"pointer"}}/>
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">
                {loading == true ?  <Loading_screen color="white" size="100px"/> : (
                <div className="content" style={{height:"550px"}} onClick={(event => {event.stopPropagation()})}>
                    <div className="row" >
                        <div className="col-xl-7" style={{width:"550px"}}>
                            <Post_slider storage={param.storage} data={param.data}/>
                        </div>
                        <div className="col-xl-5" style={{width:"500px",paddingLeft:"0px"}}>
                            <Post_author storage={param.storage} data={param.data}/>
                            <Post_btns  data={param.data} togglePostModal={null}/>
                            <Post_content data={param.data} />
                            <Post_comments data={data}/>
                            <Add_comment post_id={param.data.post_id} refreshComments={refetch}/>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );


}

export default Post_preview;
