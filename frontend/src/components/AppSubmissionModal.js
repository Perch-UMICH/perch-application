import React, {Component} from 'react';
import BasicButton from './BasicButton';
import { getCurrentUserId, returnToProfile } from '../helper.js';
import $ from 'jquery';

class AppSubmissionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			slug: 'the-infant-cognition-project',
			s_dest: `/student-profile/${getCurrentUserId()}`,
		};
		this.submitApplication = this.submitApplication.bind(this);
	}

	onClick(event) {
		// add time commitment, open slots, is 'open' a boolean?
	    $('#submitModal').fadeOut("slow");
	    $('#modalBackdrop').fadeOut("slow");
	}

	submitApplication(event) {
		// ADD SUBMIT APPLICATION FUNCTION
		returnToProfile()
	}

	render() {
		// var l_dest = '/prof-page/' + this.state.slug;
		return(
			<div>
				<div id="submitModal" className="modal">
			 		<div className="modal-content">
				    	<h4>Ready to Submit?</h4>
				    	<p>To submit your application to <i>{this.state.lab_name}</i>, confirm below.<br/> 
				    	   We'll notify you if they think it's a match.</p>
				   	</div>
				   	<div className="modal-footer">
						<BasicButton superClick={this.onClick} msg='Edit' />
				   		<BasicButton superClick={this.submitApplication} msg='Submit Application' />
				   		{/*<BasicButton dest={l_dest} msg='Return to Lab Page' />
				   		<BasicButton dest={this.state.s_dest} msg='Return to Profile' />*/}
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default AppSubmissionModal;