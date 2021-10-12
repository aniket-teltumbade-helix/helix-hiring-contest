import { ADD_CONTACT, VIEW_CONTACT } from "../actionTypes"

const initialState = {
    add_contact: null,
    view_contact: null
}

const contactReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_CONTACT:
            return { ...state, add_contact: payload }

        case VIEW_CONTACT:
            return { ...state, view_contact: payload }

        default:
            return state
    }
}

export default contactReducer
