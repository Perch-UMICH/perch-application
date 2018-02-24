import React, {Component} from 'react';
import SquareButton from './SquareButton';
import './PastResearch.css';

class StudentBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Short description of background, experience, and interests",
			bio_text: '',
		};
		if (this.props.location.pathname.split('/')[1] === 'update-student-bio') {
			// Should be set to student's current bio:
			this.state.bio_text = "I'm a junior at the University of Michigan studying Computer Science with interests in Computer Security, Software Development, and Machine Learning.";
		}
	}

	updateBioText(event) {
		this.setState({
			bio_text: event.target.value
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var btn_msg = 'next';
		var dest = '/upload-image?user_type=student';
		var update = false;
		if (url_arr[1] === "update-student-bio") {
			btn_msg = 'back';
			dest = '/student-profile';
			update = true;
		}
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>
						{ update ? <div className='update-info'>Update </div> : null } 
						 Bio
					</div>
					<form className='container'>
						<textarea className='past-research-input' id="textArea" 
							type="text" value={this.state.bio_text} 
							placeholder={this.state.placeholder} 
							onChange={event => this.updateBioText(event)}>
						</textarea>
						<SquareButton destination={dest} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default StudentBio;