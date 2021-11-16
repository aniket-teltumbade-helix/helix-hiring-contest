import axios from 'axios'
import {
  LOAD_CHALLENGE_LEADERBOARD,
  LOAD_CONTEST_LEADERBOARD,
  LOAD_SELF_CONTEST_RANK,
  SOLVED_CHALLENGES,
  SOLVED_MCQS
} from '../actionTypes'

export const challengeLeaderboard = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/rank/challenge_rank`,
    headers: {
      'Content-Type': 'application/json'
      // 'x-access-token': tokanstorage
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_CHALLENGE_LEADERBOARD,
    payload: res.data
  })
}

export const contestLeaderboard = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/rank/contest_rank`,
    headers: {
      'Content-Type': 'application/json'
      // 'x-access-token': tokanstorage
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_CONTEST_LEADERBOARD,
    payload: res.data
  })
}
export const selfContestRank = body => async dispatch => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/rank/me_contest_rank`,
    headers: {
      'Content-Type': 'application/json'
      // 'x-access-token': tokanstorage
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_SELF_CONTEST_RANK,
    payload: res.data
  })
}
export const solvedChallenges = (body)=>async (dispatch) => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/rank/solved/challenges`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body),
  }
  let res = await axios(config)
  dispatch({
    type: SOLVED_CHALLENGES,
    payload: res.data
  })
  return res.data
}

export const solvedMcqs = (body)=>async (dispatch) => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/rank/solved/mcqs`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body),
  }
  let res = await axios(config)
  dispatch({
    type: SOLVED_MCQS,
    payload: res.data
  })
  return res.data
}

