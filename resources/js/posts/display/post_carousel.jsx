import React,{useState,useEffect} from 'react';
import ReactDOM from "react-dom";


function Post_carousel() {
    const[data,setData]=useState({});
    fetch(userInfo.postsGateWay).then(function (res) {
        res.json().then(function (res) {
            setData(res);
        })
    }).then(
       function () {
           console.log(data);
       }
    );
    return(
        <div>

        </div>
    );

}
ReactDOM.render(<Post_carousel/>,document.querySelector('#post_carousel'));
