import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'
import { 
  getModelHasMany, 
  respond,  
  error_handle, 
  simpleGet,
  simplePost,
  simplePatch,
  formDataPost,
  hasManyDelete,
  simpleDelete,
} from './BackendHelpers'


// Check a user's role
export function getUserRole() {
  return sessionStorage.getItem('user_role')
}

export function getCurrentUserId () {
  return parseInt(sessionStorage.getItem('user_id'))
}

export function isStudent() {
  return getUserRole() === "student"
}

export function isFaculty() {
  return getUserRole() === "faculty"
}

export function hasApprovalPower() {
  return sessionStorage.getItem('user_has_approval_power')
}

export async function getUser({user_id}) {
  return simpleGet({ path: 'users/' + user_id })
}

// Gets the user profile without additional info
export async function getUserProfile({user_id}) {
  return simpleGet({path: 'users/' + user_id + '/profile'})
}

// Gets a user with all profile information
export async function getUserProfileFull({user_id}) {
  return axios
  .get('users/' + user_id)
  .then(response => {
    let user = response.data
    return axios
    .get('users/' + user_id + '/profiles')
    .then(response2 => {
      let profile = response2.data
      return getModelHasMany({
        path: '/profiles/' + profile.id,
        fields: [
          'experiences',
          'degrees',
          'links',
          'certifications',
          'honors',
        ]
      })
      .then(response => {
        user.profile = response
        return user
      })
    })
  })
}

// RESTRICTED: user_id
export async function deleteUser() {
  let user_id = sessionStorage.getItem('user_id')
  return axios
    .delete('users/' + user_id)
    .then(response => {
      sessionStorage.clear()
      return respond(response.status, response.data)
    })
    .catch(error => {
      return error_handle(error)
    })
}

// RESTRICTED: user_id
export async function updateUser({user}) {
  let user_id = sessionStorage.getItem('user_id')
  // user._method = 'PUT'
  return simplePatch({ 
    path: 'users/' + user_id,
    data: user,
  })
}

// Universal Profile Update
// Input should be in format
/*
profile: {
  role: "string",
  contactEmail: "string",
  contactPhone: "string,"
  bio: "string", 

  // The following are arrays of attached objects
  // Include an id if you want to update existing object (check getUserProfile)
  // Don't include id if you want to create a new object
  // Leave an empty array to delete all objects
  // Don't include the array at all (null) to leave things unchanged

  // NOTE: to generate date string, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON

  experiences : [
    {
      id: 0,
      type: "string", (REQUIRED)
      title: "string", (REQUIRED)
      description: "string",
      startDate: "dateString", ()
      endDate:  "dateString"
    }
  ]

  certifications: [
    {
      id: 0,
      name: "string", (REQUIRED)
    }
  ]

  degrees: [
    {
      id: 0,
      name: "string", (REQUIRED)
      startDate: "dateString", (REQUIRED)
      endDate: "dateString", (REQUIRED)
    }
  ]

  honors: [
    {
      id: 0,
      name: "string", (REQUIRED)
      date: "string",
    }
  ]

  links: [
    {
      id: 0,
      type: "string", (REQUIRED)
      link: "string",
    }
  ]
}
*/
export async function updateUserProfile(profile) {
  let user_id = sessionStorage.getItem('user_id')
  if(profile.role) { sessionStorage.setItem('user_role', profile.role) }
  // delete profile.id
  return simplePatch({
    path: 'users/' + user_id + '/profile', 
    data: profile,
  })
}

export async function getUserGroups() {
  let user_id = sessionStorage.getItem('user_id')
  return simpleGet({ path: 'users/' + user_id + '/groups' })
}

// Profile component functions require the profileId
// to be supplied in the data object

// File functions (images and documents)


export async function getProfileResumeFile() {
  let user_id = sessionStorage.getItem('user_id')
  return simpleGet({
    path: '/users/' + user_id + '/profile/resume'
  })
}


export async function getProfilePictureFile() {
  let user_id = sessionStorage.getItem('user_id')
  return simpleGet({
    path: '/users/' + user_id + '/profile/profile_picture'
  })
}

/*
To upload a file:
HTML: 
  <input type="file" name="fileToUpload" id="fileToUpload"></input>
Javascript:
  let file = document.getElementById('fileToUpload').files[0];
  uploadUserResumeDocument({user_id: 1, file: file});
*/
export async function uploadResumeFile({file}) {
  let user_id = sessionStorage.getItem('user_id')
  return formDataPost({ 
    path: 'users/' + user_id + '/profile/resume', 
    data: file 
  })
}

export async function uploadProfilePictureFile({file}) {
  let user_id = sessionStorage.getItem('user_id')
  return formDataPost({ 
    path: 'users/' + user_id + '/profile/profile_picture', 
    data: file 
  })
}

export async function deleteResumeFile() {
  let user_id = sessionStorage.getItem('user_id')
  return simpleDelete({ 
    path: 'users/' + user_id + '/profile/resume'
  })
}

export async function deleteProfilePictureFile() {
  let user_id = sessionStorage.getItem('user_id')
  return simpleDelete({ 
    path: 'users/' + user_id + '/profile/profile_picture'
  })
}

// Certification functions



// Experience functions

// Degree functions



// Honor functions


// Link functions