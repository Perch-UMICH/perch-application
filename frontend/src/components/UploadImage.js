import React, {Component} from 'react';
import { parse } from 'query-string';
import { uploadPic, getCurrentUserId, getUser, getStudentFromUser, getFacultyFromUser } from '../helper.js';
import SquareButton from './SquareButton';
import './UploadImage.css';
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
							dest: '/student-profile', 
							user_type: "student",
							type_id: resp.result.id,
						});
					});
				}
				else if (resp.result.is_faculty) {
					getFacultyFromUser(user_id).then(resp => {
						this.setState({ 
							dest: '/prof-page', 
							user_type: "faculty",
							type_id: resp.result.id,
						});
					});
				}
			}
		});
		if (url_arr[1] === "update-image") {
			this.setState({ btn_msg: "back", update: true });
		}
	}

	clickUpload(event) {
		var img_file = $('#img_file').val();
		uploadPic(this.state.user_type, this.state.type_id, img_file).then(resp => {
			console.log("whaddup");
			console.log(resp);
		});
		//window.location.href = this.state.dest;
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
							  <input type="file" />
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