import React from 'react';
import ReactDOM from 'react-dom';
import ResultElement from './result_element';

function ResultContainer(param) {
    console.log(param);
    if (!param.display) return null;
    return(
        <div id="search-form-result" className="py-2 my-4 w-75" onMouseDown={(event => {event.preventDefault()})} >
            {
                Object.keys(param.data).map(x=>{
                    let obj=param.data[x];
                    return <ResultElement data={obj} url={param.url} storage={param.storage}/>
                })
            }
        </div>
        );

}
export default ResultContainer;
