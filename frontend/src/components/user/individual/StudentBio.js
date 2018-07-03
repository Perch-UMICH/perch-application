import React, {Component} from 'react';
import SquareButton from '../../utilities/buttons/SquareButton';
import {getStudent, getStudentFromUser, getCurrentStudentId, getCurrentUserId, updateStudent} from '../../../helper.js';
import './PastResearch.css';

class StudentBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Short description of background, experience, and interests",
			bio: '',
			url_string: this.props.location.pathname.split('/')[1],
		};
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	componentDidMount() {
		getStudentFromUser(getCurrentUserId()).then( r => {
			console.log(r);
			this.setState({bio: r.result.bio, user_id: r.result.id})
		});
	}

	saveAndContinue(event) {
		updateStudent(this.state.user_id, null, null, null, null, null, null, this.state.bio, null, null).then(()=> {
			if (this.state.url_string === "update-user-bio") {
				window.location = `/user-profile/${getCurrentUserId()}`;
			} else {
				window.location = '/upload-image?user_type=student';
			}
		});
	}

	updateBioText(event) {
		this.setState({
			bio: event.target.value
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var btn_msg = 'next';
		var update = false;
		if (url_arr[1] === "update-user-bio") {
			btn_msg = 'save';
			update = true;
		}
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>
						{ update ? <div className='update-info'>Update </div> : null } 
						Personal Bio
					</div>
					<form className='container'>
						<textarea className='past-research-input' id="textArea" 
							type="text" value={this.state.bio} 
							placeholder={this.state.placeholder} 
							onChange={event => this.updateBioText(event)}>
						</textarea>
						<SquareButton superClick={this.saveAndContinue} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentBio;