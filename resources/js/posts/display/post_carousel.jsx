import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import Post from "./post";
import axios from "axios";
import useAxios from "axios-hooks";
import Loading_screen from "../../helpers/loading";

function Post_carousel() {
    const[page,setPage]=useState(1);
    const[data,setData]=useState([]);
    const[loading, setLoading]=useState(true);
    useEffect(async()=>{
        const response = await axios.get(posts.postsProposedGateWay+"/"+userInfo.userId,{params:{"page":page}});
        setData((prev)=>[...prev,...response.data]);
        setLoading(false);
    },[page]);



    useEffect(()=>{
        document.addEventListener("scroll",()=>{
            if(document.documentElement.scrollHeight - window.scrollY <1000){
                setPage((page)=>page+1)
            }
        })
    },[]);

    if(loading)return <Loading_screen/>;

    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            {
                Object.values(data).map(x=>{return <Post data={x} storage={storage}/>})
            }
        </div>
    );

}
ReactDOM.render(<Post_carousel/>,document.querySelector('#post_carousel'));
