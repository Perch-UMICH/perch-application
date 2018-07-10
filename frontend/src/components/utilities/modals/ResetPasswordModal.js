import React, {Component} from 'react';
import BasicButton from '../buttons/BasicButton';
import { resetPassword, updateUser, getCurrentUserId, isStudent, isLab} from '../../../helper.js';
import alertify from 'alertify.js';
import iziToast from 'izitoast';
import $ from 'jquery';

class ResetPasswordModal extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	onClick(event) {
	    $("#resetPassword").removeClass('activated');
	    $('#modalBackdrop').fadeOut("slow");
	}

	resetPassword(event) {
		// TODO TEMPORARILY BROKEN FROM API UPDATE
		updateUser(getCurrentUserId(), null, null, $('#new_password').val(), isStudent(), isLab()).then(resp => {
			console.log("reset password!");
			console.log(resp);
			// alertify.success("Password Successfully Reset");
			iziToast.show({
				    title: 'success',
				    message: 'Password Reset',
				    color: 'green',
				    position: 'bottomLeft',
				    progressBarColor: 'white',
				});
			this.onClick();
		});
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
