import axios from 'axios'
import {
  LOGIN_DEVELOPER,
  REGISTER_DEVELOPER,
  REGISTER_COMPANY,
  LOGIN_COMPANY,
  IS_LOGGEDIN,
  LOGOUT,
  REQUEST_PASS_TOKEN_DEVELOPER,
  REQUEST_PASS_TOKEN_COMPANY,
  RESET_PASSWORD_DEVELOPER,
  RESET_PASSWORD_COMPANY
} from '../actionTypes'

export const devRegister = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  dispatch({
    type: REGISTER_DEVELOPER,
    payload: result.data
  })
  return result.data
}

export const devLogin = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  if (result.data.err) {
    dispatch({
      type: LOGIN_DEVELOPER,
      payload: { isAuth: false, userLogin: null }
    })
  } else {
    if (body.remember === false) {
      sessionStorage.setItem('token', result.data.authtoken)
    } else {
      localStorage.setItem('token', result.data.authtoken)
    }
    dispatch({
      type: LOGIN_DEVELOPER,
      payload: { isAuth: true, userLogin: result.data.authtoken }
    })
  }
  return result.data
}

export const devRequestPass = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/request_pass_token`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  if (result.status === 200) {
    dispatch({
      type: REQUEST_PASS_TOKEN_DEVELOPER,
      payload: result.data
    })
  } else {
    dispatch({
      type: REQUEST_PASS_TOKEN_DEVELOPER,
      payload: result.data
    })
  }
}

export const devResetPass = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/reset_password`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  if (result.status === 200) {
    dispatch({
      type: RESET_PASSWORD_DEVELOPER,
      payload: result.data
    })
  } else {
    dispatch({
      type: RESET_PASSWORD_DEVELOPER,
      payload: result.data
    })
  }
}

export const compRegister = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/admin/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)

  dispatch({
    type: REGISTER_COMPANY,
    payload: result.data
  })
}

export const compLogin = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/admin/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  if (result.data.err) {
    dispatch({
      type: LOGIN_COMPANY,
      payload: { isAuth: false, userLogin: null }
    })
  } else if (result.data.authtoken) {
    if (body.remember === false) {
      sessionStorage.setItem('token', result.data.authtoken)
    } else {
      localStorage.setItem('token', result.data.authtoken)
    }
    dispatch({
      type: LOGIN_COMPANY,
      payload: { isAuth: true, userLogin: result.data.authtoken }
    })
  }
}
export const compRequestPass = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/admin/request_pass_token`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  if (result.status === 200) {
    dispatch({
      type: REQUEST_PASS_TOKEN_COMPANY,
      payload: result.data
    })
  } else {
    dispatch({
      type: REQUEST_PASS_TOKEN_COMPANY,
      payload: result.data
    })
  }
}
export const compResetPass = body => async dispatch => {
  const data = JSON.stringify(body)
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/admin/reset_password`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  const result = await axios(config)
  if (result.status === 200) {
    dispatch({
      type: RESET_PASSWORD_COMPANY,
      payload: result.data
    })
  } else {
    dispatch({
      type: RESET_PASSWORD_COMPANY,
      payload: result.data
    })
  }
}
export const isAuthenticated = () => async dispatch => {
  if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/user/profile`,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const result = await axios(config)
    if (result.data.err) {
      sessionStorage.clear()
      localStorage.clear()
      dispatch({
        type: IS_LOGGEDIN,
        payload: { isAuth: false, userProfile: null }
      })
    } else {
      dispatch({
        type: IS_LOGGEDIN,
        payload: { isAuth: true, userProfile: result.data }
      })
    }
  }
}
export const logout = () => dispatch => {
  sessionStorage.clear()
  localStorage.clear()
  dispatch({
    type: LOGOUT,
    payload: null
  })
}
