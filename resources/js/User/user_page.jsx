import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Post_thumbnail from "./assets/postThumbnail";

function User_page() {
    const [postCounter,setPostCounter]=useState(0);
    const[data,setData]=useState([]);
    const userImgStyle={
        width:"150px",
        height:"150px",
        border:"1px solid transparent",
        borderRadius:"100%",
    };
    const containerStyle={
        marginLeft:"20%",
        marginRight:"20%"
    };
    const spanStyle={
        fontWeight:"500",
        fontSize:"medium"
    };
    const descriptionStyle={
        fontWeight:"400",
        fontSize:"medium"
    };
    useEffect(()=>{
        axios.get(posts.postCountGateWay+"/"+userInfo.userId)
            .then(res=>{setPostCounter(res.data)});
    },[]);

    useEffect(()=>{
        axios.get(posts.postsGateWay)
            .then(res=>{setData(Object.values(res.data))});
    },[]);

    return(<div className="my-5" >
        <div className="row" style={containerStyle}>
            <div className="col-xl-3 d-flex justify-content-center">
                <img src={storage+'/'+userInfo.userPhoto}  style={userImgStyle}/>
            </div>
            <div className="col-xl-9 px-4">
                <div className="row">
                    <div className="col-xl-12 d-flex flex-row ">
                        <h2>{userInfo.userName}</h2>
                        <button  className="mx-5 ">Edytuj Profil</button>
                    </div>
                    <div className="col-xl-12 d-flex flex-row my-3">
                        <span style={spanStyle}>Posty: {postCounter}</span>
                        <span className="mx-5" style={spanStyle}>obserwujących: </span>
                    </div>
                    <div className="col-xl-12">
                        <p style={descriptionStyle}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis ornare nibh eu tempus.
                            Sed ut arcu sed odio molestie laoreet. Nunc ac malesuada neque. Nulla facilisi. Sed sed ornare massa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-5 mx-5 justify-content-center" style={{borderTop:"1px solid rgb(217,217,217)"}}>
            {data.map((x)=>{return <Post_thumbnail data={x}/>})}
        </div>
    </div>);
}








ReactDOM.render(<User_page/>,document.querySelector('#user-page'));
