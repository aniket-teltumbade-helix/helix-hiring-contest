import { LOAD_COUNTRIES } from "../actionTypes"

const initialState = {
    country: null
}

const defaultReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOAD_COUNTRIES:
            return { ...state, country: payload }

        default:
            return state
    }
}
export default defaultReducer