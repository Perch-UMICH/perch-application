import React, {Component} from 'react';
import SquareButton from './SquareButton';
import {getStudent} from '../helper.js';
import './PastResearch.css';

class StudentBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Short description of background, experience, and interests",
			bio: '',
			student_id: 1,
		};
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	componentDidMount() {
		getStudent(this.state.student_id).then((resp) => {
			if (resp.data.bio) {
				this.setState(
					{
						bio: resp.data.bio,
					}
				);
			}
            console.log(resp);
        });
	}

	saveAndContinue(event) {
		//updateStudent(this.state.student_id, null, null, this.state.major, this.state.year, this.state.gpa, null).then(resp => {
		//  NEED TO UPDATE STUDENT WITH BIO BUT NOT PART OF CURRENT FUNCTION
		//	console.log(resp);
			window.location = '/student-profile';
		//});
	}

	updateBioText(event) {
		this.setState({
			bio: event.target.value
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var btn_msg = 'next';
		var dest = '/upload-image?user_type=student';
		var update = false;
		if (url_arr[1] === "update-student-bio") {
			btn_msg = 'save';
			dest = '/student-profile';
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