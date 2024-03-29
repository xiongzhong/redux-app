
const createStore = function (initState) {
    let state = initState;
    let listeners = [];
    function subscribe(listener) {// 将所有订阅函数保存起来
        listeners.push(listener)
    }
    function changeCount(newState) {
        /*当状态改变的时候，我们要去通知所有的订阅者*/
        state = newState;
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }
    function getState() {
        return state
    }
    return {
        getState,
        subscribe,
        changeCount
    }
}
export default createStore;
