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
        this.setState({data:response_data});
        //console.log(this.state.data)
    }

    make_request(event){
        const Value = event.target.value;
        this.componentDidMount(Value)
    }

    render() {


        return(
            <div className="w-100 d-flex justify-content-center">
                <form className="w-100 d-flex justify-content-center">
                    <input onChange={this.make_request.bind(this)} placeholder="Szukaj" className="search-form-input" type="search"/>
                </form>
                <div id="search-form-result">
                    <ResultElement data={this.state.data}/>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Search/>,document.querySelector('#search-form-container'));
