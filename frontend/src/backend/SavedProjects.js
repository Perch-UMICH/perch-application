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

// Get all saved Projects
export async function getSavedProjects() {
  return simpleGet({
      path: "savedProjects",
  })
}

// Adds a project to a user's save list
export async function addSavedProject({project_id}) {
  return simplePost({
      path: "savedProjects",
      data: {projectId: project_id},
  })
}

// Removes a project from a user's save list
export async function removeSavedProject({project_id}) {
  return simpleDelete({
      path: "savedProjects",
      data: {projectId: project_id},
  })
}

// Frontend never sees the SavedProjectPivot ids so this helper is useless
// export async function removeSavedProjectBySavedProjectId({ saved_project_id }) {
//   return simpleDelete({
//     path: "savedProjects/" + saved_project_id,
//   })
// }