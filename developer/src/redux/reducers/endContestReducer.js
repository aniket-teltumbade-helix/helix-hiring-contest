import { CONTEST_STATUS, END_CONTEST, START_CONTEST } from "../actionTypes"

const initialState = {
    start: null,
    end: null,
    status: null
}

const endContestReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case START_CONTEST:
            return { ...state, start: payload }

        case END_CONTEST:
            return { ...state, end: payload }

        case CONTEST_STATUS:
            return { ...state, status: payload }

        default:
            return state
    }
}
export default endContestReducer