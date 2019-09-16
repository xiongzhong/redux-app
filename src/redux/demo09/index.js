const createStore = function (reducer, initState, rewriteCreateStoreFunc) {
    /*如果有 rewriteCreateStoreFunc，那就采用新的 createStore */
    if(typeof initState == 'function') {
        rewriteCreateStoreFunc = initState;
        initState = undefined
    }
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
        return function unsubscribe() {
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    function dispatch(action) {
        /*当状态改变的时候，我们要去通知所有的订阅者*/
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    function replaceReducer(nextReducer) {
        reducer = nextReducer
        /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
        dispatch({
            type: Symbol()
        })
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
        dispatch,
        replaceReducer
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
            let chain = middlewares.map(middleware => middleware(store.getState()));

            let dispatch = store.dispatch;
            // 实现 exception(time((logger(dispatch))))
            dispatch = compose(...chain)(store.dispatch)

            /*  chain.reverse().forEach(middleware => {
                dispatch = middleware(dispatch)
            });*/
            // 2. 重写 dispatch
            store.dispatch = dispatch;

            return store;
        }
    }
};

/**
 * 合并执行
 * @param funcs
 * @returns {*}
 */
function compose(...funcs) {
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
export {
    createStore,
    applyMiddleware
}
