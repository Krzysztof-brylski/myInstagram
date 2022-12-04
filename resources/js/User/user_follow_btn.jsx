import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell,faBellSlash} from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import axios from "axios";

function Follow_btn() {
    const [followed,setFollowed] = useState(isUserFollowed);
    const [followersCount,setFollowersCount] = useState(startFollowersCount);
    const spanStyle={
        fontSize: "medium",
        fontWeight: "500"
    };
    const follow=()=>{
        const formData = new FormData();
        formData.append('_token',userInfo.csrf);
        axios.post(followGateWay+"/"+selectedUserId,formData)
            .then((response)=>{
                if(response.data.status ==="Followed"){
                    setFollowed(true);

                }
                else{
                    setFollowed(false);

                }
                setFollowersCount(parseInt(response.data.followers_count));
            });

    };
    return(
        <>
            {followed && <FontAwesomeIcon onClick={follow} className="pointer-svg" style={{width:"40px"}} icon={faBellSlash} size={"xl"}/>}
            {!followed &&<FontAwesomeIcon onClick={follow} className="pointer-svg"  style={{width:"40px"}} icon={faBell} size={"xl"}/>}
            <span className="my-3" style={spanStyle}>obserwujący: {followersCount}</span>
        </>
        )

}
ReactDOM.render(<Follow_btn/>,document.querySelector('#User-follow-btn'));
