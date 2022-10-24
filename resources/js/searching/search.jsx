import React from 'react';
import ReactDOM from 'react-dom';
import ResultElement from './result_element';


class Search extends React.Component{

    state={
        search_input:'',
    };

    // GET request using fetch with async/await
    state={
        data:{},
    };
    async componentDidMount(name) {

        const response = await fetch(request_url+ '?'+
            new URLSearchParams({
                username:name
        }));
        const response_data = await response.json();
        if(response_data !== null){
            this.setState({data:response_data});
        }


        //console.log(this.state.data)
    }

    make_request(event){
        const Value = event.target.value;
        this.componentDidMount(Value)
    }
    show_result_container(){
        const resultContainer=document.querySelector('#search-form-result');
        if(resultContainer.classList.contains('d-none')){
            resultContainer.classList.remove('d-none');
            resultContainer.classList.remove('d-flex');
            return;
        }
        resultContainer.classList.remove('d-flex');
        resultContainer.classList.add('d-none');
    }

    render() {
        return(
            <div className="w-100 d-flex justify-content-center flex-column search-form-result-container">
                <form className="w-100 d-flex justify-content-center" >
                    <input
                        onChange={this.make_request.bind(this)}
                        onFocus={this.show_result_container}
                        onBlur={this.show_result_container}
                        placeholder="Szukaj"
                        className="search-form-input"
                        type="search"
                    />
                    <div id="search-form-result" className="py-2 my-4 w-75 d-none" onClick={(event => {event.stopPropagation()})}>
                        {
                            Object.keys(this.state.data).map(x=>{
                                let obj=this.state.data[x];
                                return <ResultElement data={obj} url={user_show_url} storage={storage}/>
                            })
                        }
                        <div>

                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
ReactDOM.render(<Search/>,document.querySelector('#search-form-container'));
