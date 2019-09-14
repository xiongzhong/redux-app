let initState =  {
    count: 0
};

export default function counterReducer(state, action) {
    if(!state) {
        state = initState;
    }
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
            return state
    }
}
