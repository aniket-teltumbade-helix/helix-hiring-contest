import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import contactReducer from './reducers/contactReducer'
import contestReducer from './reducers/contestReducer'
import defaultReducer from './reducers/defaultReducer'
import leaderboardReducer from './reducers/leaderboardReducer'
import mcqReducer from './reducers/mcqReducer'
import problemReducer from './reducers/problemReducer'
import submitReducer from './reducers/submitReducer'

let rootReducer = combineReducers({
  problemState: problemReducer,
  authState: authReducer,
  contestState: contestReducer,
  submitState: submitReducer,
  leaderboardeState: leaderboardReducer,
  commonState: defaultReducer,
  contactState: contactReducer,
  mcqState: mcqReducer,
})
export default rootReducer