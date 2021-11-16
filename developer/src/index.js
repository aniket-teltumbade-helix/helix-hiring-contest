import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import axios from 'axios'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { CssBaseline } from '@material-ui/core'
import theme from './helpers/theme'
import { CookiesProvider } from 'react-cookie';

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
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

