/*------count 的发布订阅者实践------*/
class Store {
    constructor(count = 1) {
        this.state = {
            count
        };
        this.listeners = [];
    }

    subscribe(listener) {// 将所有订阅函数保存起来
        this.listeners.push(listener)
    }
    changeCount(count) {
        /*当 count 改变的时候，我们要去通知所有的订阅者*/
        this.state.count = count;
        for (let i = 0; i < this.listeners.length; i++) {
            const listener = this.listeners[i];
            listener();
        }
    }
}
let store = new Store();

export default store;
