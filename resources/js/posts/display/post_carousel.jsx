import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import Post from "./post";
import axios from "axios";
import Loading_screen from "../../helpers/loading";

function Post_carousel() {
    const[page,setPage]=useState(1);
    const[data,setData]=useState([]);
    const[loading, setLoading]=useState(true);
    const[maxPages,setMaxPages]=useState(0);
    useEffect(async()=>{
        const response = await axios.get(posts.postsProposedGateWay+"/"+userInfo.userId,{params:{"page":page}});
        setMaxPages(parseInt(response.data['max_pages']));
        let data=Object.values(response.data);
        data.pop();
        setData((prev)=>[...prev,...data]);
        setLoading(false);

    },[page]);

    const handleScroll=()=>{

        if(window.innerHeight + document.documentElement.scrollTop+1 >=document.documentElement.scrollHeight ){
            setLoading(true);
            setPage((page)=>page+1);
        }
    };

    useEffect(()=>{

        if(page < maxPages) {
            document.addEventListener("scroll", handleScroll);
            return () => document.removeEventListener("scroll", handleScroll);
        }
    },[page,maxPages]);
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            {
                Object.values(data).map(x=>{return <Post data={x} storage={storage}/>})
            }
            {loading && <Loading_screen/>}
        </div>
    );

}
ReactDOM.render(<Post_carousel/>,document.querySelector('#post_carousel'));
