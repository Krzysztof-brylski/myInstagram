import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
function Loading_screen() {
    return (<div className="w-100 h-50 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>

    </div>);
}
export default Loading_screen;
