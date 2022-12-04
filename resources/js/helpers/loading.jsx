import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
function Loading_screen({color="black",size="50px"}) {
    return (<div className="w-100 h-50 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" style={{width:size,height:size,color:color}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>

    </div>);
}
export default Loading_screen;
