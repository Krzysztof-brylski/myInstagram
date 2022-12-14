import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import Post from "./post";
import axios from "axios";
import Loading_screen from "../../helpers/loading";
import No_posts from "../../helpers/no_post";
import Proposing_users from "../../helpers/proposing_users";

function Post_carousel() {
    const[page,setPage]=useState(1);
    const[data,setData]=useState([]);
    const[loading, setLoading]=useState(true);
    const[maxPages,setMaxPages]=useState(0);
    useEffect(async()=>{
        const response = await axios.get(posts.postsProposedGateWay,{params:{"page":page}});
        setMaxPages(parseInt(response.data['maxPages']));
        let data=Object.values(response.data['posts']);
        setData((prev)=>[...prev,...data]);
        setLoading(false);

    },[page,maxPages]);

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
            <Proposing_users/>
            {
                Object.values(data).map(x=>{return <Post data={x} storage={storage}/>})
            }
            {loading && <Loading_screen/>}
            {page === maxPages && !loading && <No_posts/>}
        </div>
    );

}
ReactDOM.render(<Post_carousel/>,document.querySelector('#post_carousel'));
