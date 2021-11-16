import { ADD_MCQS, LOAD_MCQS } from "../actionTypes"

const initialState = {
    add: [],
    list: []
}

const mcqReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_MCQS:
            return { ...state, add: [payload, ...state.add] };

        case LOAD_MCQS:
            return { ...state, list: payload }

        default:
            return state
    }
}
export default mcqReducer
