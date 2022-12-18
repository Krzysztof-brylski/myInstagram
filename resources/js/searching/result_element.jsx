import React from 'react';

/**
 * displaying user searching result element
 * @component
 * @param {Object} data; object with user data
 * @returns {<Result_element>}
 */
function Result_element({data}){
    let url=user_show_url+'/'+data.id;
    return(
          <a href={url} className="searching-result-anhor my-1 p-1">
              <div className='searching-result-container d-flex'>
                  <div className="mx-2">
                      <img src={storage+'/'+data.image} className="searching-result-img" width="50px" height="50px"/>
                  </div>
                  <div className="searching-result-text">
                      <h6>{data.name}</h6>
                      <span>{data.username}</span>
                  </div>
              </div>
          </a>
    );
};

export default Result_element;
