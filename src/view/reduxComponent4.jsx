import React, {Component} from 'react';
import createStore from "../redux/demo03";
let state = {
    counter: {
        count: 0
    },

    person: {
        name: 'xiao ming',
        age: 12
    }
};
// 合并不同状态定义的操作类型
const reducer = combineReducers({
    counter: counterReducer,
    person: personReducer
});
let {getState, subscribe, changeCount} = createStore(reducer, state);

/**
 *
 * @param reducers
 * @returns {function(*=, *=)}
 */
function combineReducers(reducers) {
    let reducerKeys = Object.keys(reducers);
    let initState = {};
    // 利用闭包返回combination函数在changeCount中执行闭包中的函数返回新的状态
    return function combination(state = {}, action) {
        reducerKeys.forEach(key => {
            let reducer = reducers[key]; // 获取定义的操作类型函数
            let oldState = state[key]; // 获取旧状态中的值应状态
            // 执行函数后获取该状态更新后的值
            initState[key] = reducer(oldState, action);
        });
        // 保存后返回新的状态
        return initState;
    }
}
function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state,
                count: state.count + 1
            };
        case 'SUBTRACT': {
            return {
                ...state,
                count: state.count - 1
            }
        }
        default:
            return {
                ...state
            }
    }
}
function personReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'SET_AGE': {
            return {
                ...state,
                age: action.age
            }
        }
        default:
            return {
                ...state
            }
    }
}

class ReduxComponent1 extends Component {
    constructor(props) {
        super(props);
        this.state = getState()
    }
    render() {
        return (
            <div>
                <h2>4、合并多个状态</h2>
                <button onClick={ReduxComponent1.handleClick.bind(this, 1)}>加1</button>
                <button onClick={ReduxComponent1.handleClick.bind(this, 2)}>减1</button>
                <h3>count:{this.state.counter.count}</h3>
                <input type="text" placeholder="请输入姓名" name="" id="" onInput={this.handleName}/>
                <input type="number" placeholder="请输入年龄" name="" id="" onInput={this.handleAge}/>
                <ol>
                    <li>姓名：{this.state.person.name}</li>
                    <li>年龄: {this.state.person.age}</li>
                </ol>
            </div>
        );
    }
    static handleClick(type){
        if(type === 1) {
            changeCount({
                type: 'INCREASE'
            });
        } else {
            changeCount({
                type: 'SUBTRACT'
            });
        }

    }
    handleName = (e) => {
        changeCount({
            type: 'SET_NAME',
            name: e.target.value
        });
    }
    handleAge = (e) => {
        changeCount({
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
        subscribe(() => {
            console.log(getState())
            this.setState({
                ...getState()
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

export default ReduxComponent1;
