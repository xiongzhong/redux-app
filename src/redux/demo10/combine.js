
/**
 *
 * @param reducers
 * @returns {function(*=, *=)}
 */
function combineReducers(reducers) {
    let reducerKeys = Object.keys(reducers);
    let initState = {};
    // 利用闭包返回combination函数在changeCount中执行闭包中的函数返回新的状态
    return function combination(state = {}, action) {
        reducerKeys.forEach(key => {
            let reducer = reducers[key]; // 获取定义的操作类型函数
            let oldState = state[key]; // 获取旧状态中的值应状态
            // 执行函数后获取该状态更新后的值
            initState[key] = reducer(oldState, action);
        });
        // 保存后返回新的状态
        return initState;
    }
}

export default combineReducers
