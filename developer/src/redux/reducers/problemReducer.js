import {
  ADD_PROBLEM,
  COMPILE,
  OWN_CREATED_PROBLEMS,
  RUN_PROBLEM
} from '../actionTypes'

const initialState = {
  problem_output: [],
  add_problem: null,
  own_challenges: null,
  compiled_output: []
}

const problemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PROBLEM:
      return { ...state, add_problem: payload }

    case RUN_PROBLEM:
      return { ...state, problem_output: [...state.problem_output, payload] }

    case OWN_CREATED_PROBLEMS:
      return { ...state, own_challenges: payload }

    case COMPILE:
      return { ...state, compiled_output: [...state.compiled_output, payload] }

    default:
      return state
  }
}
export default problemReducer
