import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Post_thumbnail from "./helpers/postThumbnail";

function My_posts_preview() {

    const[data,setData]=useState([]);


    useEffect(()=>{
        axios.get(posts.postsGateWay+"/"+selectedUserId)
            .then(res=>{setData(Object.values(res.data))});
    },[]);
    return(
        <div className="row my-5 mx-5 justify-content-center" style={{borderTop:"1px solid rgb(217,217,217)"}}>
            {data.map((x)=>{return <Post_thumbnail data={x}/>})}
        </div>
    );
}

ReactDOM.render(<My_posts_preview/>,document.querySelector('#Posts-preview'));
