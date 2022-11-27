import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import Post from "./post";
import axios from "axios";

function Post_carousel() {
    const[data,setData]=useState([]);
    useEffect(()=>{
        axios.get(posts.postsGateWay+"/"+userInfo.userId)
            .then(res=>{setData(Object.values(res.data))});
    },[]);

    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            {
                data.map(x=>{return <Post data={x} storage={storage}/>})
            }
        </div>
    );

}
ReactDOM.render(<Post_carousel/>,document.querySelector('#post_carousel'));
