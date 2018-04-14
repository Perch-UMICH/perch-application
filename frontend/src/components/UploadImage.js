import React, {Component} from 'react';
import { parse } from 'query-string';
import { uploadPic, getCurrentUserId, getUser, getStudentFromUser, getFacultyFromUser, /*getFacultyLabs*/ } from '../helper.js';
import SquareButton from './SquareButton';
import './UploadImage.css';
import axios from 'axios';
import $ from 'jquery';

class UploadImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '',
			user_type: parse(this.props.location.search).user_type,
			btn_msg: 'next',
			update: false,
		}
		this.clickUpload = this.clickUpload.bind(this);
	}

	componentDidMount() {
		var url_arr = this.props.location.pathname.split('/');
		var user_id = getCurrentUserId();
		getUser(user_id).then(resp => {
			if (resp.result) {
				if (resp.result.is_student) {
					getStudentFromUser(user_id).then(resp => {
						this.setState({ 
							dest: `/student-profile/${getCurrentUserId()}`,
							user_type: "student",
							type_id: resp.result.id,
						});
					});
				}
				else if (resp.result.is_faculty) {
					getFacultyFromUser(user_id).then(resp => {
						// TODO TEMPORARILY COMMENTED OUT SINCE NOT WORKING FROM API UPDATE
						// getFacultyLabs(resp.result.id).then(labs => {
						// 	this.setState({ 
						// 		dest: `/prof-page/${labs[0].id}`, 
						// 		user_type: "lab",
						// 		type_id: labs[0].id,
						// 	});
						// });
					});
				}
			}
		});
		if (url_arr[1] === "update-image") {
			this.setState({ btn_msg: "back", update: true });
		}
	}

	clickUpload(event) {
		const fileInput = document.getElementById('fileToUpload').files[0];
		const formData = new FormData();
		formData.append( 'image', fileInput );
		formData.append('type', this.state.user_type);
		formData.append('id', this.state.type_id);
		console.log(formData);
		const config = {
		    headers: { 'content-type': 'multipart/form-data' }
		};

		/*

		axios.post('api/pics', formData, config)
		    .then(response => {
		        console.log(response.data.message);
		        console.log(response.data.result);
		    })
		    .catch(function (error) {
		        console.log(error);
		    })*/
		window.location.href = this.state.dest;
	}

	render() {
		return (
			<div className='upload-image shift-down'>
				<div className='container center-align upload-image-form shadow'>
					<div className='upload-image-header'>
					{ this.state.update ? <div className='update-info'>Update </div> : <div className='update-info'>Upload a </div> }
					Profile Image</div>
					<div className="container">
						<form className='file-field input-field'>
							<div className="btn upload-image-btn">
							  <span>File</span>
							  <input type="file" name="fileToUpload" id="fileToUpload" />
							</div>
							<div className="file-path-wrapper">
							  <input className="file-path validate" id="img_file" type="text" placeholder="Upload file" />
							</div>
						</form>
						<SquareButton superClick={this.clickUpload} label={this.state.btn_msg}/>
					</div>
				</div>
			</div>
		);
	}
}

export default UploadImage;