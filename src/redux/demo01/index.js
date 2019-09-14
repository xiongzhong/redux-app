/*------count 的发布订阅者实践------*/
const createStore = function (count = 0) {
    let state = {
        count
    };
    let listeners = [];
    function subscribe(listener) {// 将所有订阅函数保存起来
        listeners.push(listener)
    }
    function changeCount(count) {
        /*当 count 改变的时候，我们要去通知所有的订阅者*/
        state.count = count;
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    return {
        state,
        subscribe,
        changeCount
    }
};

export default createStore();
