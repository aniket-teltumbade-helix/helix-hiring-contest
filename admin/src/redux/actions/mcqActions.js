import { ADD_MCQS, LOAD_MCQS } from "../actionTypes"
import axios from 'axios'

export const addMCQ = (body) => async (dispatch) => {
    var config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/mcq/create`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({mcqs:body})
    }
    let res = await axios(config)
    dispatch({
        type: ADD_MCQS,
        payload: res.data
    })
    return res.data
}
export const enlistMCQ = () => async (dispatch) => {
    var config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/mcq/list`,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let res = await axios(config)
    dispatch({
        type: LOAD_MCQS,
        payload: res.data
    })
}
