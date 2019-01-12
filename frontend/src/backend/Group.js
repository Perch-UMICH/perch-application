import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'
import { 
  getModelHasMany, 
  respond,  
  error_handle, 
  simpleGet,
  simplePut,
  hasManyDelete,
  simplePost,
} from './BackendHelpers'

export function getGroup({group_id}) {
  return simpleGet({
      path: 'groups/' + group_id,
  })
}

// Backend will take user_id from headers and make group owner
export function createGroup({group}) {
  return simplePost({
    path: 'groups',
    data: group,
  })
}

// RESTRICTED user_id is a group admin
export function updateGroup({group}) {
  let group_id = group.id 
  delete group.id
  simplePut({
    path: 'groups/' + group_id,
    data: group,
  })
}

// RESTRICTED user_id owns group
export function deleteGroup({group_id}) {
  return simpleDelete({ path: 'groups/' + group_id })
}

export function getGroupMembers({group_id}) {
  return simpleGet({ path: 'groups/' + group_id })
}

// RESTRICTED user must be group admin or owner
export function inviteMembersToGroup({group_id, users_and_roles}) {
  return simplePost({
    path: 'groups/' + group_id + '/users',
    data: users_and_roles,
  })
}

export function requestUserJoinGroup({group_id}) {
  let user_id = sessionStorage.getItem('user_id')
  return simplePost({
    path: 'users/' + user_id + '/groups',
    data: group_id,
  })
}

// RESTRICTED user must be group admin or owner
export function updateGroupMembers({group_id, users_and_roles}) {
  return simplePut({
    path: 'groups/' + group_id + '/users',
    data: users_and_roles,
  })
}

// RESTRICTED user must be group admin or owner
export function removeMemberFromGroup({group_id, user_id}) {
  return simpleDelete({
    path: 'groups/' + group_id + '/users',
    data: user_id,
  })
}

export function getGroupOwnedProjects({group_id}) {
  let filter = {
    where: {
      relation: "owner"
    }
  }
  return simpleGet({
    path: 'groups/' + group_id + '/projects?filter=' + JSON.stringify(filter),
  })
}

// Returns all projects associated with a group
export function getGroupAllProjects({group_id}) {
  return simpleGet({
    path: 'groups/' + group_id + '/projects',
  })
}