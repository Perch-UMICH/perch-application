import React, {Component} from 'react';
import SquareButton from './SquareButton';
import {getStudent, getStudentFromUser, getCurrentUserId, updateStudent} from '../helper.js';

import './PastResearch.css';

class PastResearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			research: '',
		};
		// if (this.props.location.pathname.split('/')[1] === 'update-past-research') {
		// 	this.state.research = "Dr. Patil's Neurosurgery Lab\nDr. R's Pharmaceutics Lab\n";
		// }
	}

	updateResearch(event) {
		this.setState({
			research: event.target.value
		});
	}

	componentDidMount() {
		getStudentFromUser(getCurrentUserId()).then( r => this.setState({student_id: r.result.id, researcb: r.result.faculty_endorsements}))
		// getStudentFromUser(getCurrentUserId()).then( r => console.log(r))
	}

	saveAndContinue(event) {
		updateStudent(this.state.student_id, null, null, null, null, null, null, null, null, this.state.research)//.then(()=>window.location = `/student-profile/${getCurrentUserId()}`)
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var header = "List Any Past Research";
		var dest = '/notable-classes';
		var btn_msg = 'next';
		if (url_arr[1] === 'update-past-research') {
			header = "Update Past Research";
			dest = '/student-profile';
			btn_msg = 'back';
		}
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>{header}</div>
					<form className='container'>
						<textarea className='past-research-input' id="textArea" type="text" 
							value= {this.state.research}
							placeholder={this.state.placeholder} 
							onChange={event => this.updateResearch(event)}>
						</textarea>
						<SquareButton onClick={this.saveAndContinue} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default PastResearch;