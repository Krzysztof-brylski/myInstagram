import React,{useState,useEffect} from 'react';
import Post_author from "./post_author";

function Post_comment(param) {

    const commentAuthorIcon={
        width: "45px",
        height: "45px",
        borderRadius: "100%",
        border: "1px solid transparent",
        flex:"right",
    };
    const commentLikeBtn={
        width: "24px",
        height:"24px",
        transform: "scale(0.6)",
        justifyContent:"end",
        cursor:"pointer",
    };

    return(
        <div className="d-flex flex-row position-relative my-1">
            <div className="d-flex flex-row justify-content-between w-100 align-items-center" style={{padding:"0 20px 0 0"}}>
                <img src={param.storage+'/'+param.data.author.image} style={commentAuthorIcon}/>
                <div className="d-flex flex-row  w-75">
                    <h6 className="mx-2">{param.data.author.username}</h6>
                    <p>{param.data.comment.content}</p>
                </div>
                <svg style={commentLikeBtn}  xmlns="http://www.w3.org/2000/svg"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
            </div>

        </div>
    );

}
export default Post_comment;
