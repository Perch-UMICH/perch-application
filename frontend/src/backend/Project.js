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
export async function createProject({group_id, user_id, project}) {
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
export async function updateProject({project}) {
  let project_id = project.id
  delete project.id
  return simplePatch({
    path: "projects/" + project_id,
    data: project,
  })
}

// RESTRICTED: owner of project or admin of group that owns project
export async function deleteProject({project_id}) {
  return simpleDelete({
    path: "projects/" + project_id,
  })
}

// RESTRICTED: owner of project or admin of group that owns project
export async function transferProjectOwnership({}) {

}

// Get array of projects from array of projectIds
export async function getProjects(projectIds) {
  return simpleGet({
    path: "projects",
    filter: {
      where: {
        id: {
          inq: projectIds
        }
      }
    }
  });
}

/*
Returns list of projects that contain similar words that
are inside the keyword string. Words in string must be separated
by spaces to be identified as individual words
List is ordered in terms of relevancy (# matching words)
*/
export async function projectSearch({keywordString}) {
  return simpleGet({
    path: "search/project/" + keywordString,
  })
}