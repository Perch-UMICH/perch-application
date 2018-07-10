import React, {Component} from 'react';
import BasicButton from '../buttons/BasicButton';
import { deleteUser, getCurrentUserId, logoutCurrentUser } from '../../../helper.js';
import $ from 'jquery';

class DeleteUserModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.onClick = this.onClick.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}

	onClick(event) {
	    $("#deleteUser").removeClass('activated');
	    $('#modalBackdrop').fadeOut("slow");
	}

	deleteUser(event) {
		var user_id = getCurrentUserId();
		logoutCurrentUser();
		deleteUser(user_id).then(resp => {
			console.log("deleted");
			console.log(resp);
			this.onClick();
		}).then(window.location.href = '/');
	}

	render() {
		var interviewDest = '/schedule-interview/';
		return(
			<div>
				<div id="deleteUser" className="modal modal-fixed-footer display-modal">
			 		<div className="modal-content">
			 			<h4> Delete Account </h4>
			 			<p className="above-input"> Are you sure you want to delete your account? Your profile will be gone ... forever! </p>
				   	</div>
				   	<div className="modal-footer">
				     	<BasicButton superClick={this.onClick} msg='I changed my mind!' />
				     	<BasicButton superClick={this.deleteUser} msg='DELETE ME' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default DeleteUserModal;
