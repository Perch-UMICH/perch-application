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
// TODO: remove user_id. If groupId isn't specified, use project POST
// and make logged-in user the owner
export async function createProject({group_id, project}) {
  if(group_id != null) {
    return simplePost({
      path: "groups/" + group_id + "/projects/new",
      data: project,
    })
  } else {
    // If no group_id, project is attached directly to user
    return simplePost({
      path: "/projects",
      data: project,
    })
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
NEW:
Returns array of ids for projects using NATURAL LANGUAGE full
text search. Does not complete partial words.
List is ordered in terms of relevancy.

OLD (Boolean full text search):
Returns array of ids for projects that contain similar words that
are inside the keyword string. Words in string must be separated
by spaces to be identified as individual words
List is ordered in terms of relevancy (# matching words)
*/
export async function projectSearch({keywordString}) {
  return simpleGet({
    path: "search/project/" + keywordString,
  })
}