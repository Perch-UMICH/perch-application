// Text gathering component for both lab-name and lab-description pages

import React, {Component} from 'react';
import SquareButton from './SquareButton';
import './LabTextInfo.css';

class LabTextInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var dest, header_text = '';
		var url_arr = this.props.location.pathname.split('/');
		if (url_arr[1] === 'lab-name') {
			dest = 'lab-description';
			header_text = 'Your Lab Name';
		}
		else if (url_arr[1] === 'lab-description') {
			dest = 'pick-your-interests?user_type=faculty';
			header_text = 'Lab Description';
		}

		return (
			<div className='lab-text-info shift-down'>
				<div className='container center-align lab-text-info-form shadow'>
					<div className='lab-text-info-header'>{header_text}</div>
					<form className='container'>
						{url_arr[1] === 'lab-name' &&
					        <input id='lab-name-input' className='flow-text' placeholder='lab name'></input>
					    }
					    {url_arr[1] === 'lab-description' &&
					       	<textArea className='lab-text-info-input' placeholder='lab description'></textArea>
					    }
						<SquareButton destination={dest} label='next'/>
					</form>
				</div>
			</div>
		);
	}
}

export default LabTextInfo;