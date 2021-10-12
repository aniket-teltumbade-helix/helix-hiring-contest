import axios from 'axios'
import { LOAD_COUNTRIES } from '../actionTypes'

export const loadCountries = () => async dispatch => {
  var config = {
    method: 'get',
    url: 'https://countriesnow.space/api/v0.1/countries',
    headers: {}
  }

  axios(config)
    .then(function (response) {
      dispatch({
        type: LOAD_COUNTRIES,
        payload: response.data.data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
}
