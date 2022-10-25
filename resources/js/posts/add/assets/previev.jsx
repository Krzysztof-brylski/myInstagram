import React,{useState} from 'react';

function Preview(props) {

    if(!props.show) return null;
    console.log(props.files);
    return(
      <div className="d-flex align-items-stretch overflow-hidden" style={{height:"inherit"}}>
          {
              props.files.map((e)=>{
                  return (<img src={e.preview}/>);
              })
          }
      </div>
    );
}
export default Preview;
