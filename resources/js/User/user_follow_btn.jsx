import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

function Follow_btn() {

    const follow=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        axios.post(followGateWay+"/"+selectedUserId,formData)
            .then();
    };

    return(
        <button onClick={follow}> Obserwuj </button>
    )

}
ReactDOM.render(<Follow_btn/>,document.querySelector('#User-follow-btn'));
