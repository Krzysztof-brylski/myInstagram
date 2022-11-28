import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import useAxios from "axios-hooks";
import Post_thumbnail from "./helpers/postThumbnail";
import Loading_screen from "../helpers/loading";
function My_posts_preview() {

    const [{ data, loading, error }, refetch] = useAxios(posts.postsGateWay+"/"+selectedUserId);
    if (loading) return <Loading_screen/>;
    return(
        <div className="row my-5 mx-5 justify-content-center h-50" style={{borderTop:"1px solid rgb(217,217,217)"}}>

            {Object.values(data).map((x)=>{return <Post_thumbnail data={x}/>})}
        </div>
    );
}

ReactDOM.render(<My_posts_preview/>,document.querySelector('#Posts-preview'));
