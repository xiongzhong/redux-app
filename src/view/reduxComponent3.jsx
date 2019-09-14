import React, {Component} from 'react';
import createStore from "../redux/demo03";
let state = {
    count: 0
};
let {getState, subscribe, changeCount} = createStore(plan, state);
function plan(state, action) {
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

createStore(plan, state);
class ReduxComponent1 extends Component {
    constructor(props) {
        super(props);
        this.state = getState()
    }
    render() {
        return (
            <div>
                <button onClick={ReduxComponent1.handleClick.bind(this, 1)}>加1</button>
                <button onClick={ReduxComponent1.handleClick.bind(this, 2)}>减1</button>
                <h1>count:{this.state.count}</h1>
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
    // 在渲染前调用
    UNSAFE_componentWillMount() {

    }
    // 在第一次渲染后调用，只在客户端。 之后组件已经生成了对应的DOM结构，
    // 可以通过this.getDOMNode()来进行访问。
    componentDidMount() {// 渲染完成
        subscribe(() => {
            console.log(getState())
            this.setState({
                count: getState().count
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
