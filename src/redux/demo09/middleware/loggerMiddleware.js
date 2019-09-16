/**
 * 日志中间件 注意闭包的用法
 * @param store 创建的store
 * @returns {function(*): Function}
 */
function loggerMiddleware(state) {
    /**
     * @param next 下一步要执行的回调函数
     */
    return function (next) {
        /**
         * @param 回调函数的参数
         */
        return function (action) {
            console.log('更新前：', {...state});
            console.log('action', action);
            next(action);
            console.log('更新后', state);
        }
    }
}

/**
 * 简化写法
 * @param store
 * @returns {function(*): Function}
 */
/*const loggerMiddleware = store => next => action => {
    console.log('更新前：', {...store.getState()});
    console.log('action', action);
    next(action);
    console.log('更新后', store.getState());
}*/
export default loggerMiddleware
