import React, {Component} from 'react';
import './App.css';
import ReduxComponent1 from './view/reduxComponent1'
import ReduxComponent2 from './view/reduxComponent2'
import ReduxComponent3 from './view/reduxComponent3'
import ReduxComponent4 from './view/reduxComponent4'
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>封装redux</h1>
                <ReduxComponent1/>
                <hr/>
                <ReduxComponent2/>
                <hr/>
                <ReduxComponent3/>
                <hr/>
                <ReduxComponent4/>
            </div>
        )
    }


}

export default App;
