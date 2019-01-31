import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'
import { 
  getModelHasMany, 
  respond,  
  error_handle, 
  simpleGet,
  simplePatch,
  hasManyDelete,
  simpleDelete,
  simplePost,
} from './BackendHelpers'

export async function getGroup({group_id}) {
  return simpleGet({
      path: 'groups/' + group_id,
  })
}

// Backend will take user_id from headers and make group owner
export async function createGroup({group}) {
  return simplePost({
    path: 'groups',
    data: group,
  })
}

// RESTRICTED user_id is a group admin
export async function updateGroup({group}) {
  let group_id = group.id 
  delete group.id
  simplePatch({
    path: 'groups/' + group_id,
    data: group,
  })
}

// RESTRICTED user_id owns group
export async function deleteGroup({group_id}) {
  return simpleDelete({ path: 'groups/' + group_id })
}

export async function getGroupMembers({group_id}) {
  return simpleGet({ path: 'groups/' + group_id + '/users'})
}

export async function getGroupUsersAll({group_id}) {
  return simpleGet({ path: 'groups/' + group_id + '/users/all'})
}

// RESTRICTED user must be group admin or owner
// Invite multiple members
export async function inviteMembersToGroup({group_id, user_ids}) {
  return simplePost({
    path: 'groups/' + group_id + '/users',
    data: {
      userIds: user_ids,
    },
  })
}

// Invite one member
export async function inviteMemberToGroup({group_id, user_id}) {
  return simplePost({
    path: 'groups/' + group_id + '/users',
    data: {
      userIds: [user_id],
    },
  })
}

export async function requestUserJoinGroup({group_id}) {
  let user_id = sessionStorage.getItem('user_id')
  return simplePost({
    path: 'users/' + user_id + '/groups',
    data: {groupId: group_id},
  })
}

// RESTRICTED user must be group admin or owner
export async function updateGroupMembers({group_id, users_and_roles}) {
  return simplePatch({
    path: 'groups/' + group_id + '/users',
    data: {users: users_and_roles},
  })
}

export async function updateGroupMember({group_id, user_id, role}) {
  return simplePatch({
    path: 'groups/' + group_id + '/users',
    data: {users: [{userId: user_id, role: role}]},
  })
}

// RESTRICTED user must be group admin or owner
export async function removeMemberFromGroup({group_id, user_id}) {
  return simpleDelete({
    path: 'groups/' + group_id + '/users',
    data: {userId: user_id},
  })
}

export async function demoteGroupOwnerToMember({group_id, user_id}) {
  return simplePatch({
    path: 'groups/' + group_id + '/users/owner',
    data: {userId: user_id, role: "member"},
  })
}

export async function promoteGroupMemberToOwner({group_id, user_id}) {
  return simplePatch({
    patch: 'groups/' + group_id + '/users/owner',
    data: {userId: user_id, role: "owner"},
  })
}

export async function getGroupOwnedProjects({group_id}) {
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
export async function getGroupAllProjects({group_id}) {
  return simpleGet({
    path: 'groups/' + group_id + '/projects',
  })
}