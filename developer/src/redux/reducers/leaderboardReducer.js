import { LOAD_CHALLENGE_LEADERBOARD, LOAD_CONTEST_LEADERBOARD, LOAD_SELF_CONTEST_RANK, SOLVED_CHALLENGES, SOLVED_MCQS } from "../actionTypes"

const initialState = {
  challenge_leaderboard: null,
  contest_leaderboard: null,
  self_rank: null,
  solved: null
}

const leaderboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_CHALLENGE_LEADERBOARD:
      return { ...state, challenge_leaderboard: payload }

    case LOAD_CONTEST_LEADERBOARD:
      return { ...state, contest_leaderboard: payload }

    case LOAD_SELF_CONTEST_RANK:
      return { ...state, self_rank: payload }

    case SOLVED_CHALLENGES:
      return { ...state, solved: {...state.solved, challenges: payload } }

    case SOLVED_MCQS:
      return { ...state, solved: {...state.solved, mcqs: payload } }

    default:
      return state
  }
}
export default leaderboardReducer