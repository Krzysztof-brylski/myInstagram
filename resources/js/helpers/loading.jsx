import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

/**
 * displaying loading circle
 * @component
 * @param {string} [color="black"] loading circle color;
 * @param {string} [size = "50px"] loading circle size !!IN PIXELS!!;
 * @return {<Loading_screen>}
 *
 */

function Loading_screen({color="black",size="50px"}) {
    return (<div className="w-100 h-50 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" style={{width:size,height:size,color:color}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>

    </div>);
}
export default Loading_screen;
