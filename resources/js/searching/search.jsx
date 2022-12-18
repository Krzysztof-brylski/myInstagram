import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Result_container from './result_container';
import axios from "axios";

/**
 * displaying user searching input
 * @component
 * @returns {<Search>}
 */
function Search() {
    const [open,setOpen]=useState(false);
    const [data,setData]=useState(null);


    const searchRequest=(name)=>{
        if(name === ""){
            setData(null);
            return null;
        }
        axios.get(search_url,{params:{"username":name}}).then((res)=>{
            let response=Object.values(res.data);
            if(response.length > 0 ){
                setData(response);
            }else{
                setData(null);
            }
        });
    };
    const make_request=(event)=>{
        if(open){
            searchRequest(event.target.value)
        }
    };
    const show=()=>{
        setOpen(!open)
    };

    return(
        <div className="w-100 d-flex justify-content-center align-items-center flex-column search-form-result-container">
            <input
                onChange={make_request}
                onFocus={show}
                onBlur={show}
                placeholder="Szukaj"
                className="search-form-input"
                type="text"
            />
            <Result_container data={data}  display={open}/>
        </div>
    );
}

ReactDOM.render(<Search/>,document.querySelector('#search-form-container'));
