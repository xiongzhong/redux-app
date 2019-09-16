let initState = {
    name: 'laowang',
    age: 30
}

export default function personReducer(state, action) {
    if(!state) {
        state = initState;
    }
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
            return state
    }
}
