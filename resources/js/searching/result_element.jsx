import React from 'react';
import ReactDOM from 'react-dom';

const ResultElement = props=> {
    let url=props.url+'/'+props.data.id;
      return(
          <a href={url} className="searching-result-anhor my-1 p-1">
              <div className='searching-result-container d-flex'>
                  <div className="mx-2">
                      <img src={props.storage+'/'+props.data.img} className="searching-result-img" width="50px" height="50px"/>
                  </div>
                  <div className="searching-result-text">
                      <h6>{props.data.name}</h6>
                      <span>{props.data.username}</span>
                  </div>
              </div>
          </a>
      );
};

export default ResultElement;
