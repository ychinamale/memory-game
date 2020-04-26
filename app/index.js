import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './components/Board';
import './index.css'

class App extends React.Component {
    render() {
        return (
            <Board />
        );
    }
}

ReactDOM.render( <App />, document.querySelector('#app') );