import {
  LOAD_CHALLENGE_SUBMISSIONS,
  LOAD_REVIEW,
  LOAD_REVIEW_SUBMISSIONS,
  SUBMIT_PROBLEM,
  SUBMIT_QUIZ
} from '../actionTypes'

const initialState = {
  submit: null,
  challenge_submissions: null,
  reviews: null,
  review: null,
  quiz_submit: null,
}

const submitReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_PROBLEM:
      return { ...state, submit: payload }

    case SUBMIT_QUIZ:
      return { ...state, quiz_submit: payload }

    case LOAD_CHALLENGE_SUBMISSIONS:
      return { ...state, challenge_submissions: payload }

    case LOAD_REVIEW_SUBMISSIONS:
      return { ...state, reviews: payload }

    case LOAD_REVIEW:
      return { ...state, review: payload }

    default:
      return state
  }
}
export default submitReducer
