import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'
import { 
  getModelHasMany, 
  respond,  
  error_handle, 
  simpleDelete,
  simpleGet,
  simplePatch,
  hasManyDelete,
  simplePost,
} from './BackendHelpers'

// Projects can be owned by groups OR users
export function createProject({group_id, user_id, project}) {
  if(group_id !== null) {
    return simplePost({
      path: "groups/" + group_id + "/projects/new",
      data: project,
    })
  } else if(user_id != null) {
    return simplePost({
      path: "users/" + user_id + "/projects/new",
      data: project,
    })
  } else {
    // Error: owning user or group id must be supplied
  }
}

// RESTRICTED: owner of project or admin of group that owns project
export function updateProject({project}) {
  let project_id = project.id,
  delete project.id
  return simplePatch({
    path: "projects/" + project_id,
    data: project,
  })
}

// RESTRICTED: owner of project or admin of group that owns project
export function deleteProject({project_id}) {
  return simpleDelete({
    path: "projects/" + project_id,
  })
}

// RESTRICTED: owner of project or admin of group that owns project
export function transferProjectOwnership({}) {

}