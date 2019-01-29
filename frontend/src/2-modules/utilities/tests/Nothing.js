/**
 * Created by aksha on 7/22/2018.
 */
import React, { Component } from 'react'
import './Nothing.scss'
import Axios from 'axios'
import {
  getUser,
  uploadUserResumeDocument,
  deleteUserFile,
  updateUserProfile,
  getUserGroups,
  getUserProfile
} from '../../../backend/UserProfile'
import { projectSearch } from '../../../backend/Project'
import FormData from 'form-data'
import { simpleGet, simplePost } from '../../../backend/BackendHelpers'

class Nothing extends Component {
  constructor () {
    super()
  }

  render () {  
    getUserProfile({user_id: 1}).then(r=>
      console.log(r)
    )
    return <div id='test'>hi</div>
  }
}

export default Nothing
