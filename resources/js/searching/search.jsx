import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ResultContainer from './result_container';


class Search extends React.Component{


    // GET request using fetch with async/await
    state={
        data:{},
        open:false,
    };
    async componentDidMount(name) {

        const response =  await fetch(request_url+ '?'+
            new URLSearchParams({
                username:name
        }));
        const response_data = await response.json();
        if(response_data !== null){
            this.setState({data:response_data});
        }
    }

    make_request(event){
        const Value = event.target.value;
        if(this.state.open)
            this.componentDidMount(Value)
    }
    show(){
        let open=!this.state.open;
        this.setState({open: open});

    }

    render() {
        return(
            <div className="w-100 d-flex justify-content-center flex-column search-form-result-container">
                <form className="w-100 d-flex justify-content-center" >
                    <input
                        onChange={this.make_request.bind(this)}
                        onFocus={this.show.bind(this)}
                        onBlur={this.show.bind(this)}
                        placeholder="Szukaj"
                        className="search-form-input"
                        type="search"
                    />
                    <ResultContainer data={this.state.data} url={user_show_url} storage={storage} display={this.state.open}/>
                </form>

            </div>
        );
    }
}
ReactDOM.render(<Search/>,document.querySelector('#search-form-container'));
