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

// Filters only work on backend routes which have been
// coded to receive them. Mostly ManyToMany GET requests
//
// Example filters for a GET users request:
// {
//   where: {name: "joe"}
// }
//
// {
//   where: {
//     and: [
//       {name: "joe"},
//       {hasApprovalPower: true}
//     ]
//   }
// }
//
// See Loopback documentation for more filter examples
// a large number of functions and logical operators
// are supported. Even beyond "where" clauses
function appendFilter(path, filter) {
  if(filter !== null) {
    return path + '?filter=' + JSON.stringify(filter)
  } else {
    return path
  }
}

// Wrappers for simple http requests to reduce code copying, esp. for error handling
export function simpleGet({path, filter}) {
  return axios
    .get(appendFilter(path, filter))
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

export function simpleDelete({path, filter}) {
  return axios
    .delete(appendFilter(path, filter))
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

export function simplePatch({path, data, filter}) {
  return axios
    .patch(appendFilter(path, filter), data)
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

export function simplePost({path, data, filter}) {
  return axios
    .post(appendFilter(path, filter), data)
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

export function formDataPost({path, data}) {
  let formData = new FormData();
  formData.append('file', data);

  return axios.post(
    path,
    formData)
    .then(response => {
        return respond(response.status, response.data);
    })
    .catch(error => {
        return error_handle(error);
    })
}

export function hasManyDelete({path, id_array, filter}) {
  return axios
    .delete(appendFilter(path, filter), id_array)
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
// Currently redundant, may change later
export function respond ({status, data}) {
  return { status: status, data: data }
}

// Error handling //

export function error_respond (error) {
  return {
    status: error.response.status,
    error: error.response.data.error.message,
    exception: error.response.data.error.exception
  }
}

// 0 is a made up error code for non-server-related issues
export function error_handle (error) {
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
 * Currently does not support filters due to complexity
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