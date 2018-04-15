// Text gathering component for both lab-name and lab-description pages

import React, {Component} from 'react';
import SquareButton from './SquareButton';
import {updateLab, getCurrentLabId} from '../helper.js'
import $ from 'jquery'
import './LabTextInfo.css';

class LabTextInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
		};
		if (this.props.location.pathname.split('/')[1] === 'update-lab-description') {
			this.state.description = "At the Infant Cognition Project, we look closely at how infants and preschool aged children think about and understand the world around them. Specifically, we are interested in infants and young children's understanding of the social world and behavior of other people.";
		}
	}

	updateDescription(event) {
		this.setState({
			description: event.target.value
		});
	}

	getPageType() {
		var url_arr = this.props.location.pathname.split('/');
		return url_arr[1];
	}

	updateBackEnd(event) {
		event.preventDefault();
		if (this.getPageType() === 'lab-name')
			updateLab(getCurrentLabId(), $('#lab-name-input').val)
		else if (this.getPageType() === 'lab-description' || this.getPageType() === 'update-lab-description')
			 updateLab(getCurrentLabId(), null, null, null, this.state.description)
	}

	render() {
		var dest, header_text = '';
		var btn_msg = 'next';
		if (this.getPageType() === 'lab-name') {
			dest = '/lab-description';
			header_text = 'Your Lab Name';
		}
		else if (this.getPageType() === 'lab-description') {
			dest = '/pick-your-interests?user_type=faculty';
			header_text = 'Lab Description';
		}
		else if (this.getPageType() === 'update-lab-description') {
			dest = '/prof-page';
			header_text = 'Update Lab Description';
			btn_msg = 'back';
		}

		return (
			<div className='lab-text-info shift-down'>
				<div className='container center-align lab-text-info-form shadow'>
					<div className='lab-text-info-header'>{header_text}</div>
					<form className='container' onSubmit={this.updateBackEnd.bind(this)}>
						{this.getPageType() === 'lab-name' &&
					        <input id='lab-name-input' className='flow-text' placeholder='lab name'></input>
					    }
					    {(this.getPageType() === 'lab-description' || this.getPageType() === 'update-lab-description') &&
					    	<textarea className='lab-text-info-input' id="textArea" 
					    		type="text" value={this.state.description} 
					    		placeholder='lab description'
					    		onChange={event => this.updateDescription(event)}>
					    	</textarea>
					    }
						<SquareButton destination={dest} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default LabTextInfo;