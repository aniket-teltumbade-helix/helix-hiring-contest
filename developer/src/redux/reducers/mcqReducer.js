import { LOAD_MCQS } from "../actionTypes"

const initialState = {
    list: []
}

const mcqReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOAD_MCQS:
            return { ...state, list: payload }

        default:
            return state
    }
}
export default mcqReducer
