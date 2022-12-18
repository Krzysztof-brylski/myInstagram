import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import useAxios from "axios-hooks";
import Post_thumbnail from "./helpers/postThumbnail";
import Loading_screen from "../helpers/loading";
import No_user_posts from "./helpers/No_user_posts";

/**
 * displaying all user posts thumbnails on his profile page
 * @component
 * @returns {<Posts_preview>}
 */
function Posts_preview() {

    const [{ data, loading, error }, refetch] = useAxios(posts.postsGateWay+"/"+selectedUserId);
    if (loading) return <Loading_screen/>;

    return(
        <div className="row my-5 mx-5 justify-content-center h-50" style={{borderTop:"1px solid rgb(217,217,217)"}}>
            {data.length === 0 && <No_user_posts self={userInfo.userId === selectedUserId}/> }
            {Object.values(data).map((x)=>{return <Post_thumbnail data={x}/>})}
        </div>
    );
}

ReactDOM.render(<Posts_preview/>,document.querySelector('#Posts-preview'));
