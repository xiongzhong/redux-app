
/*const exceptionMiddleware = next => action => {
    try {
        next(action)
    } catch (e) {
        console.error('错误报告1: ', e)
    }
};*/
function exceptionMiddleware (store) {
    return function (next){
        return function (action) {
            try {
                next(action)
            } catch (e) {
                console.error('错误报告: ', e)
            }
        }
    }
}

export default exceptionMiddleware
