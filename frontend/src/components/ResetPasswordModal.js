import React, {Component} from 'react';
import BasicButton from './BasicButton';
import { resetPassword } from '../helper.js';
import alertify from 'alertify.js';
import $ from 'jquery';

class ResetPasswordModal extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	onClick(event) {
	    $("#resetPassword").fadeOut("slow");
	    $('#modalBackdrop').fadeOut("slow");
	}

	resetPassword(event) {
		// TODO TEMPORARILY BROKEN FROM API UPDATE
		// resetPassword(this.props.email, $('#new_password').val(), $('#new_password_conf').val()).then(resp => {
		// 	console.log("reset password!");
		// 	alertify.success("Password Successfully Reset");
		// 	this.onClick();
		// });
	}

	render() {
		var interviewDest = '/schedule-interview/';
		return(
			<div>
				<div id="resetPassword" className="modal modal-fixed-footer display-modal">
			 		<div className="modal-content">
			 			<h4> Reset Password </h4>
			 			<p className="above-input"> Enter your current password and desired new password below, then click save. </p>
		  				<div className="input-field narrow">
			                <input id="password" type="password" required />
			                <label htmlFor="password">Current Password</label>
			            </div>
          				<div className="input-field narrow">
        	                <input id="new_password" type="password" required />
        	                <label htmlFor="new_password">New Password</label>
        	            </div>
          				<div className="input-field narrow">
        	                <input id="new_password_conf" type="password" required />
        	                <label htmlFor="new_password_conf">New Password Confirmation</label>
        	            </div>
				   	</div>
				   	<div className="modal-footer">
				     	<BasicButton superClick={this.onClick} msg='close' />
				     	<BasicButton superClick={this.resetPassword} msg='save' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default ResetPasswordModal;