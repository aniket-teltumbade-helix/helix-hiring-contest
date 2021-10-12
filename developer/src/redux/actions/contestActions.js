import axios from 'axios'
import {
  ADD_CONTEST,
  LOAD_CONTEST,
  LOAD_CREATORS_CONTESTS,
  LOAD_ENDED_CONTESTS,
  LOAD_LIVE_CONTESTS,
  LOAD_PROBLEM,
  LOAD_UPCOMING_CONTESTS
} from '../actionTypes'

export const addContest = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/contest/add`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: ADD_CONTEST,
    payload: res.data
  })
}

export const liveContests = () => async dispatch => {
  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/contest/live`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_LIVE_CONTESTS,
    payload: res.data
  })
}

export const upcomingContests = () => async dispatch => {
  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/contest/upcoming`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_UPCOMING_CONTESTS,
    payload: res.data
  })
}

export const endedContests = () => async dispatch => {
  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/contest/ended`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_ENDED_CONTESTS,
    payload: res.data
  })
}

export const loadContest = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/contest/contest`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_CONTEST,
    payload: res.data
  })
}
export const loadProblem = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/contest/contestchallenge`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  if (res.data.err) {
    dispatch({
      type: LOAD_PROBLEM,
      payload: null
    })
  } else {
    dispatch({
      type: LOAD_PROBLEM,
      payload: res.data
    })
  }
}

export const creatorContests = () => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/contest/createdbyme`,
    headers: {}
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_CREATORS_CONTESTS,
    payload: res.data
  })
}
