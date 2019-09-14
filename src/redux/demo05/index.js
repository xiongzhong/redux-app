const createStore = function (reducer, initState) {
    let state = initState;
    let listeners = [];
    // 将所有订阅函数保存起来
    function subscribe(listener) {
        listeners.push(listener)
    }

    function dispatch(action) {
        /*当状态改变的时候，我们要去通知所有的订阅者*/
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    function getState() {
        return state;
    }
    dispatch({
        type: Symbol()
    });
    return {
        getState,
        subscribe,
        dispatch
    }
};

export default createStore
