import React, {Component} from 'react';
import store from "../redux/demo01";

class ReduxComponent1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: store.state.count
        };
    }
    render() {
        return (
            <div>
                <h1>count:{this.state.count}</h1>
            </div>
        );
    }
    // 在渲染前调用
    UNSAFE_componentWillMount() {
        console.log('实例挂载前',1)
    }
    // 在第一次渲染后调用，只在客户端。 之后组件已经生成了对应的DOM结构，
    // 可以通过this.getDOMNode()来进行访问。
    componentDidMount() {// 渲染完成
        store.subscribe(() => {
            this.setState({
                count: store.state.count
            });
        });


        setInterval(() => {
            let {count} = this.state;
            store.changeCount(++count);
        }, 2000);


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
