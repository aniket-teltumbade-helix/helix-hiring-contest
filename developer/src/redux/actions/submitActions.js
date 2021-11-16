import axios from 'axios'
import {
  LOAD_CHALLENGE_SUBMISSIONS,
  LOAD_REVIEW,
  LOAD_REVIEW_SUBMISSIONS,
  SUBMIT_PROBLEM,
  SUBMIT_QUIZ
} from '../actionTypes'

export const submitProblem = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/script`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: SUBMIT_PROBLEM,
    payload: res.data
  })
  return res.data
}

export const submitQuiz = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/quiz`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: SUBMIT_QUIZ,
    payload: res.data
  })
  return res.data
}
export const challengeSubmissions = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/challenge_results`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_CHALLENGE_SUBMISSIONS,
    payload: res.data
  })
}
export const allSubmissions = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/contest_results`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_REVIEW_SUBMISSIONS,
    payload: res.data
  })
}
export const submissionReview = id => async dispatch => {
  var config = {
    url: `${process.env.REACT_APP_API_URL}/submit/review/${id}`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_REVIEW,
    payload: res.data
  })
}
