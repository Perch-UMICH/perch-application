// Text gathering component for both lab-name and lab-description pages

import React, {Component} from 'react';
import SquareButton from '../../utilities/buttons/SquareButton';
import BasicButton from '../../utilities/buttons/BasicButton';
import {updateLab, getCurrentLabId, getLab} from '../../../helper.js'
import $ from 'jquery'
import './LabTextInfo.css';

class LabTextInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
		};
	}

	componentDidMount() {
		getLab(getCurrentLabId()).then(resp => this.setState({description: resp.data.description}))
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

	redirect() {
		var dest = '';

		if (this.getPageType() === 'lab-name') 
			dest = '/lab-description';
		else if (this.getPageType() === 'lab-description') 
			dest = '/pick-your-interests?user_type=faculty';
		else if (this.getPageType() === 'update-lab-description') 
			dest = `/prof-page/${getCurrentLabId()}`;

		window.location = dest;
	}

	updateBackEnd(event) {
		event.preventDefault();
		if (this.getPageType() === 'lab-name')
			updateLab(getCurrentLabId(), $('#lab-name-input').val()).then(this.redirect.bind(this))
		else if (this.getPageType() === 'lab-description' || this.getPageType() === 'update-lab-description')
			 updateLab(getCurrentLabId(), null, null, null, this.state.description).then(this.redirect.bind(this))
	}

	render() {
		var header_text = '';
		var btn_msg = 'next';
		if (this.getPageType() === 'lab-name') {
			header_text = 'Your Lab Name';
		}
		else if (this.getPageType() === 'lab-description') {
			header_text = 'Lab Description';
		}
		else if (this.getPageType() === 'update-lab-description') {
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
						<BasicButton msg={btn_msg} /*color='light'*/ />
					</form>
				</div>
			</div>
		);
	}
}

export default LabTextInfo;