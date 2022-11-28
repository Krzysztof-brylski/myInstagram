import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import Post from "./post";
import axios from "axios";
import useAxios from "axios-hooks";
import Loading_screen from "../../helpers/loading";

function Post_carousel() {
    const [{ data, loading, error }, refetch] = useAxios(posts.postsProposedGateWay+"/"+userInfo.userId);
    if (loading) return <Loading_screen/>;
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            {
                Object.values(data).map(x=>{return <Post data={x} storage={storage}/>})
            }
        </div>
    );

}
ReactDOM.render(<Post_carousel/>,document.querySelector('#post_carousel'));
