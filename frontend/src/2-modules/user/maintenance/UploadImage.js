import React, { Component } from 'react'
import { parse } from 'query-string'
import {
  getCurrentUserId,
  getUser,
	getStudentFromUser,
	getUserProfilePic,
  getFacultyFromUser /* getFacultyLabs */
} from '../../../helper.js'
import {
  EditQuickview,
  EditContainerOnboarding
} from '../individual/StudentEditors'
import './UploadImage.css'

class UploadImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dest: '',
      user_type: this.props.location
        ? parse(this.props.location.search).user_type
        : 'student',
      btn_msg: 'next',
			update: false,
			user: this.props.user,
    }
    this.clickUpload = this.clickUpload.bind(this)
  }

  componentDidMount () {
		let user = this.props.user
		getUserProfilePic(getCurrentUserId())
			.then(r => {
				if (r.data) user.img = r.data.url
				this.setState({user})
			})
  }

  clickUpload (event) {
    /*
		const fileInput = document.getElementById('fileToUpload').files[0];
		const formData = new FormData();
		formData.append( 'image', fileInput );
		formData.append('type', this.state.user_type);
		formData.append('id', this.state.type_id);
		console.log(formData);
		const config = {
		    headers: { 'content-type': 'multipart/form-data' }
		};

		axios.post('api/pics', formData, config)
		    .then(response => {
		        console.log(response.data.message);
		        console.log(response.data.result);
		    })
		    .catch(function (error) {
		        console.log(error);
		    }) */
    window.location = '/experience'
  }

  render () {
		console.log(this.props.user)
    return (
      <EditContainerOnboarding
        title='Profile Header'
        redirect={this.clickUpload.bind(this)}
      >
        <div className='min-height-edit-form'>
          <EditQuickview
            showNoSchool
            updateUser={this.props.updateUser}
            user={this.state.user}
          />
        </div>
      </EditContainerOnboarding>
    )
  }
}

export default UploadImage
