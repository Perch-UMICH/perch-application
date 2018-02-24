import React, {Component} from 'react';
import { parse } from 'query-string';
import SquareButton from './SquareButton';
import './UploadImage.css';

class UploadImage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var user_type = parse(this.props.location.search).user_type;
		var url_arr = this.props.location.pathname.split('/');
		var dest = '/prof-page';
		var btn_msg = 'next';
		var update = false;
		if (user_type === 'student') {
			dest = '/student-profile';
		}
		if (url_arr[1] === "update-image") {
			btn_msg = 'back';
			update = true;
		}
		return (
			<div className='upload-image shift-down'>
				<div className='container center-align upload-image-form shadow'>
					<div className='upload-image-header'>
					{ update ? <div className='update-info'>Update </div> : <div className='update-info'>Upload a </div> }
					Profile Image</div>
					<div className="container">
						<form className='file-field input-field'>
							<div className="btn upload-image-btn">
							  <span>File</span>
							  <input type="file" />
							</div>
							<div className="file-path-wrapper">
							  <input className="file-path validate" type="text" placeholder="Upload file" />
							</div>
						</form>
						<SquareButton destination={dest} label={btn_msg}/>
					</div>
				</div>
			</div>
		);
	}
}

export default UploadImage;