import { LOAD_MCQS } from "../actionTypes"
import axios from 'axios'

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
