/**
 * Created by aksha on 2/28/2018.
 */

import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'

axios.defaults.headers.common = {}

// axios.defaults.baseURL = 'https://perchresearch.com:3000/' // Dev
// axios.defaults.baseURL = 'http://18.211.86.64:8000/';     // Production
axios.defaults.baseURL = 'http://127.0.0.1:3000/';         // Local

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'

if (sessionStorage.token) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + sessionStorage.getItem('token')
}

// Wrapper for simple get requests to reduce code copying
export function simpleGet({path}) {
  return axios
    .get(path)
    .then(response => {
      return respond({
        status: response.status,
        data: response.data,
      })
    })
    .catch(error => {
      return error_handle({error: error})
    })
}

export function simplePut({path, data}) {
  return axios
    .put(path, data)
    .then(response => {
      return respond({
        status: response.status,
        data: response.data,
      })
    })
    .catch(error => {
      return error_handle({error: error})
    })
}

export function simplePost({path, data}) {
  return axios
    .post(path, data)
    .then(response => {
      return respond({
        status: response.status,
        data: response.data,
      })
    })
    .catch(error => {
      return error_handle({error: error})
    })
}

export function hasManyDelete({path, id_array}) {
  return axios
    .delete(path, id_array)
    .then(response => {
      return respond({
        status: response.status,
        data: response.data,
      })
    })
    .catch(error => {
      return error_handle({error: error})
    })
}

// Response generator
export function respond ({status, data}) {
  return { status: status, data: data.result, msg: data.message }
}

// Error handling //

export function error_respond ({error}) {
  return {
    status: error.response.status,
    error: error.response.data.error.message,
    exception: error.response.data.error.exception
  }
}

// 0 is a made up error code for non-server-related issues
export function error_handle ({error}) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // return respond(error.response.status, error.response);
    if (error.response.data.error) throw error_respond(error)
    else throw error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // return respond(0, error.request)
    throw error
  } else {
    // Something happened in setting up the request that triggered an Error
    // return respond(0, error.message)
    throw error
  }
}

/* Gets a model WITH all hasMany arrays
 *
 * Inefficient - makes a request for every hasMany relationship
 * Should be moved to a backend function. Unfortunately Loopback
 * does not have an automatic version implemented yet
 */
export async function getModelHasMany({path, fields}) {
  let promises = []
  let responseObject = {}
  for(let j = 0; j < fields.length; ++j) {
    promises.push(axios.get(path + '/' + fields[j]))
  }
  return axios.get(path).then(
    (response) => {
      responseObject = response.data
      return Promise.all(promises).then(responses => {
        for(let i = 0; i < responses.length; ++i) {
          responseObject[fields[i]] = responses[i]
        }
        return responseObject
      })
    }
  )
}