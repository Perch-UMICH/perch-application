import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import './LabWebsite.css';

class LabWebsite extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='lab-website shift-down'>
				<div className='container center-align lab-website-form shadow'>
					<div className='lab-website-header'>Your Current Lab Website</div>
					<form className='container input-field'>
						<input className='lab-website-input' type="text" placeholder="lab website URL"></input>
						<BasicButton destination='upload-image' msg='next'/>
					</form>
				</div>
			</div>
		);
	}
}

export default LabWebsite;