import React from 'react';
import ResultElement from './result_element';
import Loading_screen from "../helpers/loading";

/**
 * displaying container for user searching results
 * @component
 * @param {boolean} display; boolean for displaying image form
 * @param {Array} data; array with user searching results
 * @returns {null|<Result_container>}
 */
function Result_container({display,data}) {
    if (!display) return null;
    return(
        <div id="search-form-result" className="py-2 my-4 w-75" onMouseDown={(event => {event.preventDefault()})} >

            {data == null && <Loading_screen />}
            {
                data !=null &&
                data.map(obj=>{
                    return <ResultElement data={obj}/>
                })
            }
        </div>
        );

}
export default Result_container;
