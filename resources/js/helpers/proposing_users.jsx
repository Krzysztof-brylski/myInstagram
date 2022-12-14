import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loading_screen from "./loading";
import ResultElement from "../searching/result_element";
function Proposing_users() {

    const[resultData,setResultData]=useState(null);
    const[loading,setLoading]=useState(true);

    const suggestionsContainer={
        position:"absolute",
        top:"20%",
        right:"5%",
        overflowY:"hidden",
        width:"20%"
    };
    const goToListStyle={
      textDecoration:"none",
      fontWeight:"bold",
    };
    useEffect(()=>{
        axios.get(userInfo.suggestedFollowsGateWay,{data:{"json":"true"}}).then((res)=>{

            setResultData(Object.values(res.data));
            setLoading(false)
        });
    },[]);
    return(
        <div className="mx-1 d-flex flex-column justify-content-center" style={suggestionsContainer}>
            <div className="my-2  text-center d-flex flex-row justify-content-between">
                <h6>Propozycje dla ciebie:</h6>
                <a style={goToListStyle} href={userInfo.suggestedFollowsGateWay}>Cała lista</a>
            </div>

            {loading && <Loading_screen/>}
            {resultData !== null &&
                resultData.map((item)=>{return (<ResultElement data={item}/>)})
            }
        </div>
    );
}
export default Proposing_users;
