import React, {Component} from 'react';
import SquareButton from './SquareButton';
import {getStudent, getStudentFromUser, getCurrentUserId, updateStudent} from '../helper.js';

import './PastResearch.css';

class PastResearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			research: '',
			research_arr: [
				{
					id: 'r_0',
					text: '',
				},
			],
			url_string: this.props.location.pathname.split('/')[1],
		};
		// if (this.props.location.pathname.split('/')[1] === 'update-past-research') {
		// 	this.state.research = "Dr. Patil's Neurosurgery Lab\nDr. R's Pharmaceutics Lab\n";
		// }
		this.saveAndContinue = this.saveAndContinue.bind(this);
		this.state.r_index = this.state.research_arr.length;
	}

	updateResearch(event) {
		this.setState({
			research: event.target.value
		});
	}

	addResearch(event) {
		var newResearchID = "r_" + this.state.r_index;
		var newResearchText = '';
		var newResearch = {
			"id": newResearchID,
			"text": newResearchText,
		};
		var newRIndex = this.state.r_index + 1;
		var updated_research = this.state.research_arr.concat([newResearch]);
		this.setState({ 
			research_arr: updated_research, 
			r_index: newRIndex,
		});
	}

	alterResearch(event, research_id) {
		var temp_research = this.state.research_arr;
		var index = temp_research.findIndex(item => item.id === research_id);
		temp_research[index].text = event.target.value;
		this.setState({ 
			research_arr: temp_research,
		});
	}

	removeResearch(research_id) {
		this.setState((prevState) => {
			var temp_research = prevState.research_arr;
			var removeIndex = temp_research.map(function(item) { return item.id; }).indexOf(research_id);
			temp_research.splice(removeIndex, 1);
			return { 
				research_arr: temp_research,
			};
		});
	}

	componentDidMount() {
		getStudentFromUser(getCurrentUserId()).then( r => this.setState({student_id: r.result.id, researcb: r.result.faculty_endorsements}))
		// getStudentFromUser(getCurrentUserId()).then( r => console.log(r))
	}

	saveAndContinue(event) {
		updateStudent(this.state.student_id, null, null, null, null, null, null, null, this.state.research, null, null).then(resp => {
			if (this.state.url_string === "update-past-research") {
				window.location = `/student-profile/${getCurrentUserId()}`;
			} else {
				window.location = '/student-bio';
			}
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var header = "Past Research";
		var btn_msg = 'next';
		if (url_arr[1] === 'update-past-research') {
			header = "Update Past Research";
			btn_msg = 'back';
		}
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>{header}</div>
					<form className='container'>
						<div className='notable-classes-label left-align class-creation-label'>
							List Research Experiences
							<a onClick={this.addResearch.bind(this)} id="addQuestion" > <i className="material-icons">add</i></a>
						</div>
					    {this.state.research_arr.map((r) => {
							return (
								<div className="row">
									<div className="col s11">
										{/*TODO: TURN TEXTAREA INTO A COMPONENT*/}
										<textarea id={r.id} type="text" placeholder="Dr. Patil's Neurosurgery Lab" className='notable-classes-input' id="class-input" rows='1' value={r.text} onChange={event => this.alterResearch(event, r.id)} required></textarea>
									</div>
									<div className="col s1">
										<a id={r.id} className="remove-question" onClick={() => this.removeResearch(r.id)}><i className="material-icons interest-editor opacity-1">clear</i></a>
									</div>
								</div>);
						})} <br/>
						<SquareButton superClick={this.saveAndContinue} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default PastResearch;