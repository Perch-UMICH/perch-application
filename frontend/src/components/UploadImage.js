import React, {Component} from 'react';
import SquareButton from './SquareButton';
import './UploadImage.css';

class UploadImage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='upload-image shift-down'>
				<div className='container center-align upload-image-form shadow'>
					<div className='upload-image-header'>Upload a Profile Image</div>
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
						<SquareButton destination='prof-page' label='next'/>
					</div>
				</div>
			</div>
		);
	}
}

export default UploadImage;