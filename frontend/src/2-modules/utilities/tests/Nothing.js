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
import { projectSearch, createProject } from '../../../backend/Project'
import FormData from 'form-data'
import { simpleGet, simplePost } from '../../../backend/BackendHelpers'
import { createGroup } from '../../../backend'

class Nothing extends Component {
  constructor () {
    super()
  }

  render () {
    // createGroup({
    //   group: {
    //     name: 'test lab',
    //     description: 'text description',
    //     contactEmail: 'bearb@umich.edu',
    //     contactPhone: '815262662622'
    //   }
    // }).then(r => console.log('new group', r))
    let group_id = 1
    
    return <div id='test'>hi</div>
  }
}

export default Nothing
