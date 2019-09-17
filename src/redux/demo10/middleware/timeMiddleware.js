// 中间件扩展，在打印日志前输出当前时间戳
const timeMiddleware = state => next => action => {
    console.log(Date.now())
    next(action)
}

export default timeMiddleware
