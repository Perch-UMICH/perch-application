/**
 * Created by aksha on 7/22/2018.
 */
import React, { Component } from 'react'
import './Nothing.scss'
import Axios from 'axios'
import {getUser, uploadUserResumeDocument, deleteUserFile} from '../../../backend/UserProfile'
import {projectSearch} from '../../../backend/Project'
import FormData from 'form-data'

class Nothing extends Component {
  constructor () {
    super()
    sessionStorage.setItem('user_id', 1);
    projectSearch({keywordString: "cancer"})
      .then(response => {
        console.log(response)
      })

  }

  // File Testing
  sendFile() {
    let file = document.getElementById('fileToUpload').files[0];
    uploadUserResumeDocument({user_id: 1, file: file});
  }

  deleteFile() {
    let id = document.getElementById('fileId').value;
    deleteUserFile({file_id: parseInt(id)});
  }
  //

  render () {
    return <div id='test'>
      <h1>File Upload Test</h1>
      <input type="file" name="fileToUpload" id="fileToUpload"></input>
      <button onClick={this.sendFile}>Submit File</button>
      <input type="text" name="fileId" id="fileId"></input>
      <button onClick={this.deleteFile}>Delete File</button>
    </div>
  }
}

export default Nothing
