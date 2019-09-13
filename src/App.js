import React, {Component} from 'react';
import './App.css';
import ReduxComponent1 from './view/reduxComponent1'
import ReduxComponent2 from './view/reduxComponent2'
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>封装redux</h1>
                <ReduxComponent1/>
                <ReduxComponent2/>
            </div>
        )
    }


}

export default App;
