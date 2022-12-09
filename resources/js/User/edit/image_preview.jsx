import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';


function Image_preview({image}) {
    console.log(image);
    return(<img src={storage+URL.revokeObjectURL(image.src)}/>)
}
