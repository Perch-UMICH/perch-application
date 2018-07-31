import React, {Component} from 'react';
import { parse } from 'query-string';
import { uploadPic, getCurrentUserId, getUser, getStudentFromUser, getFacultyFromUser, /*getFacultyLabs*/ } from '../../../helper.js';
import BasicButton from '../../utilities/buttons/BasicButton';
import {EditQuickview, EditContainerOnboarding} from '../individual/StudentEditors';
import './UploadImage.css';
import axios from 'axios';
import $ from 'jquery';

class UploadImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '',
			user_type: this.props.location ? parse(this.props.location.search).user_type : "student",
			btn_msg: 'next',
			update: false,
		}
		this.clickUpload = this.clickUpload.bind(this);
	}

	componentDidMount() {
		var url_arr = this.props.location ? this.props.location.pathname.split('/') : "";
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
		    })*/
		window.location = '/experience';
	}

	render() {
		return (
			<EditContainerOnboarding title="Profile Header" redirect={this.clickUpload.bind(this)}>
				<form className="min-height-edit-form" >
					<EditQuickview img='/img/rodriguez.jpg' updateUser={this.props.updateUser} user={this.props.user}/>
				</form>
			</EditContainerOnboarding>
		);
	}
}

export default UploadImage;
