export function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state,
                count: state.count + 1
            };
        case 'SUBTRACT': {
            return {
                ...state,
                count: state.count - 1
            }
        }
        default:
            return {
                ...state
            }
    }
}
export function personReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'SET_AGE': {
            return {
                ...state,
                age: action.age
            }
        }
        default:
            return {
                ...state
            }
    }
}
