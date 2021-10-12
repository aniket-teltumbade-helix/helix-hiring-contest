import {
  IS_LOGGEDIN,
  LOGIN_COMPANY,
  LOGIN_DEVELOPER,
  LOGOUT,
  REGISTER_COMPANY,
  REGISTER_DEVELOPER,
  REQUEST_PASS_TOKEN_COMPANY,
  REQUEST_PASS_TOKEN_DEVELOPER,
  RESET_PASSWORD_COMPANY,
  RESET_PASSWORD_DEVELOPER
} from '../actionTypes'

const initialState = {
  userRegister: [],
  isAuth: false,
  role: null,
  userLogin: null,
  userProfile: null,
  pass_token: [],
  reset_password: []
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_DEVELOPER:
      return {
        ...state,
        userRegister: [...state.userRegister, payload]
      }

    case LOGIN_DEVELOPER:
      return {
        ...state,
        isAuth: payload.isAuth,
        userLogin: payload.userLogin
      }

    case REQUEST_PASS_TOKEN_DEVELOPER:
      return {
        ...state,
        pass_token: [...state.pass_token, payload]
      }

    case RESET_PASSWORD_DEVELOPER:
      return {
        ...state,
        reset_password: [...state.reset_password, payload]
      }

    case REGISTER_COMPANY:
      return {
        ...state,
        userRegister: [...state.userRegister, payload]
      }

    case LOGIN_COMPANY:
      return {
        ...state,
        isAuth: payload.isAuth,
        userLogin: payload.userLogin
      }

    case REQUEST_PASS_TOKEN_COMPANY:
      return {
        ...state,
        pass_token: [...state.pass_token, payload]
      }

    case RESET_PASSWORD_COMPANY:
      return {
        ...state,
        reset_password: [...state.reset_password, payload]
      }

    case IS_LOGGEDIN:
      return {
        ...state,
        isAuth: payload.isAuth,
        userProfile: payload.userProfile.msg
      }

    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        userProfile: null
      }

    default:
      return state
  }
}
export default authReducer
