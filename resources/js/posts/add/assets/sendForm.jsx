import React,{useState} from 'react';

function SendForm(param) {

    if(!param.show) return null;

    return(
        <div>
            <form>
                <textarea>

                </textarea>
                <button className="form-submit">Udostępnij</button>
            </form>
        </div>
    );

}
export default SendForm;
