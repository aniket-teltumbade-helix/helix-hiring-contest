import axios from 'axios'
import {
  ADD_PROBLEM,
  RUN_PROBLEM,
  OWN_CREATED_PROBLEMS,
  COMPILE
} from '../actionTypes'

export const addChallenge = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/problem/create`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }

  let res = await axios(config)
  dispatch({
    type: ADD_PROBLEM,
    payload: res
  })
}

export const runProgram = (language, code, samples, name) => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/problem/run`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ language, code, samples })
  }

  let res = await axios(config)
  let result = { ...res.data, name }
  dispatch({
    type: RUN_PROBLEM,
    payload: result
  })
}
export const compileProgram = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/problem/compile`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }

  let res = await axios(config)
  dispatch({
    type: COMPILE,
    payload: res.data
  })
}

export const ownChallenges = () => async dispatch => {
  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/problem/mychallenges`,
    headers: {
      'Content-Type': 'application/json'
      // 'x-access-token': tokanstorage
    }
  }
  let res = await axios(config)
  dispatch({
    type: OWN_CREATED_PROBLEMS,
    payload: res.data
  })
}
