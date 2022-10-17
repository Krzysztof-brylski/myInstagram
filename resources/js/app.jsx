import './bootstrap';
import ReactDOM from "react-dom";
import React from "react";
import Example from './components/Example';


if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
