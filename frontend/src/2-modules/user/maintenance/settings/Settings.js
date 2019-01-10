// Text gathering component for both lab-name and lab-description pages
import React, {Component} from 'react';
import BasicButton from '../../../utilities/buttons/BasicButton';
import ResetEmailModal from '../../../utilities/modals/ResetEmailModal';
import ResetPasswordModal from '../../../utilities/modals/ResetPasswordModal';
import DeleteUserModal from '../../../utilities/modals/DeleteUserModal';
import DotLoader from '../../../utilities/animations/DotLoader';
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin, getUser, updateStudent, getStudentFromUser, updateUser, isStudent, isLab} from '../../../../helper.js'
import './Settings.css';
import $ from 'jquery';
import iziToast from 'izitoast';
import Presentation from './Presentation'

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			user_type: "",
			loading: true,
		};
		this.openEmailModal = this.openEmailModal.bind(this);
		this.openPasswordModal = this.openPasswordModal.bind(this);
		this.openDeleteModal = this.openDeleteModal.bind(this);
		this.resetEmail = this.resetEmail.bind(this);
	}

	componentDidMount() {
		if (isLoggedIn()) {
			getUser(getCurrentUserId()).then((resp) => {
				this.setState(
					{
						name: resp.data.name,
						email: resp.data.email,
						user_type: resp.data.is_student ? "Student" : "Faculty",
						loading: false,
					}
				);
				if (resp.data.is_student) {
					getStudentFromUser(getCurrentUserId()).then( r => {
						this.setState({student_id: r.data.id})
					});
				}
			});
		}
	}

	resetEmail(email) {
		updateUser(getCurrentUserId(), null, email, $('#new_password').val(), isStudent(), isLab()).then(resp => {
			iziToast.show({
				    title: 'Success',
				    message: 'Email Reset',
				    color: 'green',
				    position: 'bottomLeft',
				    progressBarColor: 'white',
				});
			this.setState({ email: email });
		});
		// updateStudent(this.state.student_id, null, null, null, null, null, email, null, null, null).then(resp => {
		// 	alertify.success("Email Successfully Reset");
		// 	console.log(resp);
		// 	this.setState({ email: email });
		// });
	}

	openEmailModal() { // superClick
		$("#resetEmail").addClass('activated');
    $("#modalBackdrop").fadeIn("slow");
	}

	openPasswordModal() { // superClick
		$("#resetPassword").addClass('activated');
    $("#modalBackdrop").fadeIn("slow");
	}

	openDeleteModal() { // superClick
		$("#deleteUser").addClass('activated');
    $("#modalBackdrop").fadeIn("slow");
	}

	render() {
		let functions = {
			openEmailModal: this.openEmailModal,
			openPasswordModal: this.openPasswordModal,
			openDeleteModal: this.openDeleteModal,
			resetEmail: this.resetEmail,
		}
		return (
			<Presentation {...functions} {...this.state}/>
		);
	}
}

export default Settings;
