import React, {Component} from 'react';
import createStore from "../redux/demo06";
import combineReducers from '../redux/demo06/combine'
import counterReducer from '../redux/demo06/countType'
import personReducer from '../redux/demo06/personType'
// 中间件
import exceptionMiddleware from  '../redux/demo06/middleware/exceptionMiddleware'
import loggerMiddleware from  '../redux/demo06/middleware/loggerMiddleware'
import timeMiddleware from  '../redux/demo06/middleware/timeMiddleware'
// 合并不同状态定义的操作类型
const reducer = combineReducers({
    counter: counterReducer,
    person: personReducer
});

const store = createStore(reducer);
const next = store.dispatch;

// 日志输出中间件
let logger = loggerMiddleware(store);
// 异常处理中间件
let exception = exceptionMiddleware(store);
// 中间件扩展，在打印日志前输出当前时间戳
let time = timeMiddleware(store)

/*重写了store.dispatch*/
// 处理异常并输出日志
store.dispatch = exception(time(logger(next)));

class ReduxComponent6 extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
    }
    render() {
        return (
            <div>
                <h2>6、中间件封装</h2>
                <button onClick={this.handleClick.bind(this, 1)}>加1</button>
                <button onClick={this.handleClick.bind(this, 2)}>减1</button>
                <h3>count:{this.state.counter.count}</h3>
                <input type="text" placeholder="请输入姓名" defaultValue={this.state.person.name} id="" onInput={this.handleName}/>
                <input type="number" placeholder="请输入年龄" defaultValue={this.state.person.age} id="" onInput={this.handleAge}/>
                <ol>
                    <li>姓名：{this.state.person.name}</li>
                    <li>年龄: {this.state.person.age}</li>
                </ol>
            </div>
        );
    }
    handleClick = type => {
        if(type === 1) {
            store.dispatch({
                type: 'INCREASE'
            });
        } else {
            store.dispatch({
                type: 'SUBTRACT'
            });
        }

    };
    handleName = (e) => {
        store.dispatch({
            type: 'SET_NAME',
            name: e.target.value
        });
    }
    handleAge = (e) => {
        store.dispatch({
            type: 'SET_AGE',
            age: e.target.value
        });
    }
    // 在渲染前调用
    UNSAFE_componentWillMount() {

    }
    // 在第一次渲染后调用，只在客户端。 之后组件已经生成了对应的DOM结构，
    // 可以通过this.getDOMNode()来进行访问。
    componentDidMount() {// 渲染完成
        store.subscribe(() => {
            this.setState({
                ...store.getState()
            })
        });
    }
    // 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    // 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {

    }
    // 在组件完成更新后立即调用。在初始化时不会被调用
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {

    }
    // 在组件从 DOM 中移除之前立刻被调用。
    componentWillUnmount() {
    }

}

export default ReduxComponent6;
