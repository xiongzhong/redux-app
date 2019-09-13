import React, {Component} from 'react';
import createStore from "../redux/demo02";

class ReduxComponent1 extends Component {
    constructor(props) {
        super(props);
        this.store = null;
        this.state = {
            count: 1,
            person: {
                name: 'laowang',
                sex: '男'
            }
        };
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>更新数据</button>
                <h1>count:{this.state.count}</h1>

                <h2>姓名：{this.state.person.name}，性别：{this.state.person.sex}</h2>
            </div>
        );
    }
    handleClick= ()=> {
        let state = Object.assign(this.store.state, {
            count: 5,
            person: {
                name: 'xiaoming',
                sex: '女'
            }
        });
        this.store.changeCount(state);

    }
    // 在渲染前调用
    UNSAFE_componentWillMount() {
        this.store = createStore(this.state);
    }
    // 在第一次渲染后调用，只在客户端。 之后组件已经生成了对应的DOM结构，
    // 可以通过this.getDOMNode()来进行访问。
    componentDidMount() {// 渲染完成
        this.store.subscribe(() => {
            console.log(this.state)
            this.setState({
                count: this.store.getState('count')
            })
            this.setState({
                person: this.store.getState('person')
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
