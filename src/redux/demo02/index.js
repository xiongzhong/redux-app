class Store {
    constructor(initState) {
        this.state = initState;
        this.listeners = [];
    }
    subscribe(listener) {// 将所有订阅函数保存起来
        this.listeners.push(listener)
    }
    changeCount(newState) {
        /*当状态改变的时候，我们要去通知所有的订阅者*/
        this.state = newState;
        for (let i = 0; i < this.listeners.length; i++) {
            const listener = this.listeners[i];
            listener();
        }
    }
    getState(name) {
        return this.state[name]
    }
}

function createStore(initState) {
    return new Store(initState)
}

export default createStore
