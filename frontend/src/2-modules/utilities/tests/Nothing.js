/**
 * Created by aksha on 7/22/2018.
 */
import React, { Component } from 'react'
import './Nothing.scss'
import Axios from 'axios'
import { projectSearch } from '../../../backend/Project'
import FormData from 'form-data'
import { 
  getUser,
  uploadUserResumeDocument,
  deleteUserFile,
  updateUserProfile,
  getUserGroups,
  getUserProfile,
  inviteMembersToGroup, 
  getGroupUsersAll} from '../../../backend';

class Nothing extends Component {
  constructor () {
    super()
  }

  render () {  
    getUserProfile({user_id: 1}).then(r=>
      console.log(r)
    )
    inviteMembersToGroup({group_id: 1, user_ids: [1, 2]}).then(r => {
      console.log(r)
      getGroupUsersAll({group_id: 1}).then(r =>
        console.log(r)
      );
    });
    return <div id='test'>hi</div>
  }
}

export default Nothing
