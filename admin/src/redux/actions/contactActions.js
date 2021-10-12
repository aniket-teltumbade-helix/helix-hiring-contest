import axios from 'axios'
import { ADD_CONTACT, VIEW_CONTACT } from '../actionTypes';
export const addContact = (body) => async (dispatch) => {
    var data = JSON.stringify(body)
    var config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/contact`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    let result = await axios(config)
    dispatch({
        type: ADD_CONTACT,
        payload: result.data
    })
    return result.data;
}

export const loadContacts = () => async (dispatch) => {
    var config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/contact`,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    let result = await axios(config)
    dispatch({ type: VIEW_CONTACT, payload: result.data })
    return result.data;
}
