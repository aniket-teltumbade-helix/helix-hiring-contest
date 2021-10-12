import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'
import { Provider } from 'react-redux'
import axios from 'axios'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import {CssBaseline} from '@material-ui/core'
import theme from './helpers/theme'
axios.interceptors.request.use(
  request => {
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      request.headers['Authorization'] = `Bearer ${sessionStorage.getItem(
        'token'
      ) || localStorage.getItem('token')}`
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
