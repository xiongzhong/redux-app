import React, {Component} from 'react';
import './App.css';
import ReduxComponent1 from './view/reduxComponent1'
import ReduxComponent2 from './view/reduxComponent2'
import ReduxComponent3 from './view/reduxComponent3'
import ReduxComponent4 from './view/reduxComponent4'
import ReduxComponent5 from './view/reduxComponent5'
import ReduxComponent6 from './view/reduxComponent6'
import ReduxComponent7 from './view/reduxComponent7'
import ReduxComponent8 from './view/reduxComponent8'
class App extends Component {
    render() {
        return (
            <div className="App" style={{paddingBottom:"100px"}}>
                <h1>封装redux</h1>
                <ReduxComponent1/>
                <hr/>
                <ReduxComponent2/>
                <hr/>
                <ReduxComponent3/>
                <hr/>
                <ReduxComponent4/>
                <hr/>
                <ReduxComponent5/>
                <hr/>
                <ReduxComponent6/>
                <hr/>
                <ReduxComponent7/>
                <hr/>
                <ReduxComponent8/>
            </div>
        )
    }


}

export default App;
