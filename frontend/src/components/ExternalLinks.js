import React, {Component} from 'react';
import { parse } from 'query-string';
import { uploadPic, getCurrentUserId, getUser, getStudentFromUser, getFacultyFromUser, getCurrentLabId, isStudent, isLab } from '../helper.js';
import SquareButton from './SquareButton';
import './UploadImage.css';
import $ from 'jquery';

class ExternalLinks extends Component {
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
		if (isStudent()) {
			this.setState({ 
				dest: `/student-profile/${getCurrentUserId()}`,
				user_type: "student",
				type_id: getCurrentUserId(),
			});
		}
		else if (isLab()) {
			this.setState({ 
				dest: `/student-profile/${getCurrentLabId()}`, 
				user_type: "faculty",
				type_id: getCurrentLabId(),
			});
		}
		if (url_arr[1] === "update-image") {
			this.setState({ btn_msg: "back", update: true });
		}
	}

	clickUpload(event) {
		var img_file = $('#img_file').val();
		/* == BUGGY!
		uploadPic(this.state.user_type, this.state.type_id, img_file).then(resp => {
			console.log("whaddup");
			console.log(resp);
		});*/
		window.location.href = this.state.dest;
	}

	render() {
		return (
			<div className='upload-image shift-down'>
				<div className='container center-align upload-image-form shadow'>
					<div className='upload-image-header'>
					{ this.state.update ? <div className='update-info'>Update </div> : null }
					External Links</div>
					<div className="container external-links-content">
		  				<div className="input-field">
			                <input id="linked_in" required />
			                <label htmlFor="linked_in">LinkedIn</label>
			            </div>
			            <div className="input-field">
			                <input id="resume_link" required />
			                <label htmlFor="resume_link">Resume Link</label>
			            </div>
			            <div className="input-field">
			                <input id="personal_website" required />
			                <label htmlFor="personal_website">Personal Website</label>
			            </div>
						<SquareButton superClick={this.clickUpload} label={this.state.btn_msg}/>
					</div>
				</div>
			</div>
		);
	}
}

export default ExternalLinks;