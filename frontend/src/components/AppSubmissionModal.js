import React, {Component} from 'react';
import BasicButton from './BasicButton';
import { getCurrentUserId } from '../helper.js';

class AppSubmissionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			slug: 'the-infant-cognition-project',
			s_dest: `/student-profile/${getCurrentUserId()}`,
		};
	}

	render() {
		var l_dest = '/prof-page/' + this.state.slug;
		return(
			<div>
				<div id="submitModal" className="modal">
			 		<div className="modal-content">
				    	<h4>Application Submitted!</h4>
				    	<p>Your application has been successfully submitted to <i>{this.state.lab_name}</i>.<br/> 
				    	   We'll notify you if they think it's a match.</p>
				   	</div>
				   	<div className="modal-footer">
				   		<BasicButton dest={l_dest} msg='Return to Lab Page' />
				   		<BasicButton dest={this.state.s_dest} msg='Return to Profile' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default AppSubmissionModal;