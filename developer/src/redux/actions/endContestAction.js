import { CONTEST_STATUS, END_CONTEST, START_CONTEST } from "../actionTypes";
import axios from 'axios'

export const startContest = (body) => async (dispatch) => {
    var config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/contestflag/start`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(body)
    };

    let result = await axios(config)
    dispatch({ type: START_CONTEST, payload: result.data })

    return result.data
}

export const endContest = (body) => async (dispatch) => {
    var config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/contestflag/end`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(body)
    };

    let result = await axios(config)
    dispatch({ type: END_CONTEST, payload: result.data })

    return result.data
}

export const contestStatus = (body) => async (dispatch) => {
    var config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/contestflag/status`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(body)
    };

    let result = await axios(config)
    dispatch({ type: CONTEST_STATUS, payload: result.data })

    return result.data
}
