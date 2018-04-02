import React, {Component} from 'react';
import BasicButton from './BasicButton';
import $ from 'jquery';

class ResetEmailModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.onClick = this.onClick.bind(this);
		this.resetEmail = this.resetEmail.bind(this);
	}

	onClick(event) {
	    $("#resetEmail").fadeOut("slow");
	    $('#modalBackdrop').fadeOut("slow");
	}

	resetEmail(event) {
		this.onClick();
		// reset email?
	}

	render() {
		var interviewDest = '/schedule-interview/';
		return(
			<div>
				<div id="resetEmail" class="modal modal-fixed-footer display-modal">
			 		<div class="modal-content">
			 			<h4> Reset Email </h4>
			 			<p> Enter the email you would like to update to below, then click save. </p>
		  				<div className="input-field">
			                <input id="email" type="email" required />
			                <label htmlFor="email">New Email</label>
			            </div>
				   	</div>
				   	<div class="modal-footer">
				     	<BasicButton superClick={this.onClick} msg='close' />
				     	<BasicButton superClick={this.resetEmail} msg='Save' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default ResetEmailModal;