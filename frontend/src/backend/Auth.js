import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'
import { getModelHasMany, respond, error_respond, error_handle } from './BackendHelpers.js'

export function isLoggedIn() {
  if (sessionStorage.getItem('token') == null) {
    return false
  }
  return true
}

/* Login and Signup are the same
 *
 * Returns an object stating whether:
 * - the user needs to choose a role
 * - the user needs to go through the initial profile building process
 */
export function loginOrSignup ({token}) {
  return axios.post('auth', {
    token
  }).then(response=> {
    sessionStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = 
      'Bearer ' + sessionStorage.getItem('token')
    sessionStorage.setItem('user_id', response.data.userid)
    // go through initial profile building process
    if (response.data.newUser) {

    } else { // login

    }
    return respond({status: response.status, data: response.data})
  })
  .catch(error => {
    return error_handle(error)
  })
}

export function logout() {
  // Clear all user cookies
  //   cookie.remove('perch_api_key');
  //   cookie.remove('perch_user_id');
  // let oldToken = sessionStorage.getItem('token')
  
  // We need to retain the sessionStorage headers
  // when sending the logout request
  let returnVal = axios
    .post('api/logout')
    .then(response => {
      return respond(response.status, response.data)
    })
    .catch(error => {
      return error_handle(error)
    })

  // Clear everything
  sessionStorage.clear()

  return returnVal
}