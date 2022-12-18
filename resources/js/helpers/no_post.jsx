import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-regular-svg-icons';

/**
 * display information about end of posts to see
 * @component
 * @returns {<No_posts>}
 *
 */

function No_posts() {

    const postContainer={
        width:"35%",
        border:"1px rgb(217,217,217) solid",
        borderRadius:"8px",
        backgroundColor:"white",
    };

    return(
        <div style={postContainer} className="my-2 d-flex flex-column justify-content-center align-items-center">
           <h2 className="my-3">Upss...</h2>
           <FontAwesomeIcon icon={faEyeSlash} size={"6x"} className="my-3"/>
           <h4 className="my-3">Zobaczyłeś już wszystkie posty</h4>
           <p>Zaobesrwuj nowe osoby a ich posty pokażą się tutaj</p>
        </div>
    );
}
export default No_posts
