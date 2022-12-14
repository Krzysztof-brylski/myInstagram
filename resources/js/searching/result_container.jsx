import React from 'react';
import ReactDOM from 'react-dom';
import ResultElement from './result_element';
import Loading_screen from "../helpers/loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
//{ param.data.empty() && <FontAwesomeIcon  icon={faXmark}/>}
function ResultContainer(param) {
    if (!param.display) return null;
    return(
        <div id="search-form-result" className="py-2 my-4 w-75" onMouseDown={(event => {event.preventDefault()})} >

            {param.data == null && <Loading_screen />}
            {
                param.data !=null &&
                param.data.map(obj=>{
                    return <ResultElement data={obj}/>
                })
            }
        </div>
        );

}
export default ResultContainer;
