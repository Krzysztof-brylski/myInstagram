import React,{useState,useEffect} from 'react';
import Post_slider from "./post_slider";
import Post_author from "./post_author";
import Post_content from "./post_content";
import Post_btns from "./post_btns";
import Post_comments from  './post_comments';
import Add_comment from  './add_post_comment';
import axios from "axios";
function Post_preview(param) {
    if(param.show === false){return null;}

    const[data,setData]=useState([]);

    const getComments=()=>{
        axios.get(posts.postCommentsGateWay+"/"+param.data.post_id)
            .then(res=>{setData(Object.values(res.data))}).finally();

    };
    useEffect(()=>{
        getComments();
    },[]);


    return (
        <div className="modal-overlay" style={param.style}>

            <div className="modal-close-btn-container" style={{top:"0"}}>
                <p onClick={param.onClose} className="modal-close-btn m-3">
                    <svg aria-label="Zamknij" className="x1n2onr6 x1lliihq" color="#ffffff" fill="#ffffff" height="18"
                         role="img" viewBox="0 0 24 24" width="18"><title>Zamknij</title>
                        <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor"
                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline>
                        <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                    </svg>
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">

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
                            <Add_comment post_id={param.data.post_id} refreshComments={getComments}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Post_preview;
