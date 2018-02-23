import React, {Component} from 'react';
import './Feedback.css';

class Feedback extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container feedback valign-wrapper'>
				{/*Add shift-down to parent div immediately above when you write this*/}
				<div className='container center-align'>
					To Be a Feedback Form
				</div>
				
			</div>
		);
	}
}

export default Feedback;