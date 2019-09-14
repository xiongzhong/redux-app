const createStore = function (reducer, initState, rewriteCreateStoreFunc) {
    /*如果有 rewriteCreateStoreFunc，那就采用新的 createStore */
    if(rewriteCreateStoreFunc) {
        const newCreateStore =  rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer, initState);
    }
    // 正常创建store
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
/**
 * 添加中间件重写store
 * @param middlewares 中间件
 * @returns {function(*): function(*=, *=): *}
 */
const applyMiddleware = function (...middlewares) {
    // 返回一个重写createStore
    return function rewriteCreateStoreFunc (oldCreateStore) {
        // 返回重写后新的 createStore
        return function newCreateStore (reducer, initState) {
            // 1. 生成store
            let store = oldCreateStore(reducer, initState);
            // 给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);
            let chain = middlewares.map(middleware => middleware(store));
            let dispatch = store.dispatch;
            // 实现 exception(time((logger(dispatch))))
            chain.reverse().forEach(middleware => {
                dispatch = middleware(dispatch)
            });
            // 2. 重写 dispatch
            store.dispatch = dispatch;

            return store;
        }
    }
}

export {
    createStore,
    applyMiddleware
}
