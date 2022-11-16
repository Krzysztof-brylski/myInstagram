import React,{useState,useEffect} from 'react';


function Post_author(param) {

    const postAuthorContainer={
        display:"flex",
        alignItems:"center",
        borderBottom: "1px solid rgb(217,217,217)"
    };

    return(
        <div style={postAuthorContainer} className="py-2">
            <div className="mx-2">
                <img src={param.storage+'/'+param.data.author.image} className="searching-result-img" width="50px" height="50px"/>
            </div>
            <div className="d-flex align-items-center">
                <h6>{param.data.author.username}</h6>
            </div>
        </div>

    )

}
export default Post_author;
