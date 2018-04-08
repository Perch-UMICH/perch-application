import React, {Component} from 'react';
import SquareButton from './SquareButton';
import ModalButton from './ModalButton';
import BubbleChoice from './BubbleChoice';
import './CreatePosition.css';

class CreatePosition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			positionName: '',
			questions: [
				{
					"id": "q_0",
					"text": "Why are you interested in working for our lab?"
				},
				{
					"id": "q_1",
					"text": "How do your skills/experiences align with our lab work?"
				},
				{
					"id": "q_2",
					"text": "How much wood would a wood chuck chuck if a wood chuck *couldn't* chuck wood?"
				},
			],
			lowerHours: 8,
			upperHours: 10,
			numSlots: 1,
			q_index: 0,
			display_info: {
				placeholder_txt: "Search skills",
				header_txt: "Required Skills",
				catalog: [
					'React.js',
					'Node.js',
					'Meteor.js',
					'Kali Linux',
					'Pen Testing',
					'plating',
					'chromatography',
					'R',
					'C++',
					'MatLab',
					'Javascript',
					"pun making",
					"spectography",
					"total phosphorus digestion",
					"outlet finding",
					"envelope sealing",
					"grant writing",
				],
				interests: []
			},
			modal_info: {
				positionName: '',
				positionDesc: '',
				questions: [],
				skills: [],
				lowerHours: 8,
				upperHours: 10,
				numSlots: 1,
			}
		};
		this.state.modal_info.questions = this.state.questions;
		this.state.q_index = this.state.questions.length;
		this.alterQuestion = this.alterQuestion.bind(this);
		this.updateSkills = this.updateSkills.bind(this); // callback to BubbleChoice
	}

	updatePositionName(event) {
		this.setState({
		    positionName: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      positionName: event.target.value,
		    }),
		});
	}

	updatePositionDesc(event) {
		this.setState({
		    modal_info: Object.assign({}, this.state.modal_info, {
		      positionDesc: event.target.value,
		    }),
		});
	}

	updateLowerHours(event) {
		this.setState({
			lowerHours: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      lowerHours: event.target.value,
		    }),
		});
	}

	updateUpperHours(event) {
		this.setState({
			upperHours: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      upperHours: event.target.value,
		    }),
		});
	}

	updateNumSlots(event) {
		this.setState({
			numSlots: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      numSlots: event.target.value,
		    }),
		});
	}

	addQuestion(event) {
		var newQuestionID = "q_" + this.state.q_index;
		var newQuestionText = '';
		var newQuestion = {
			"id": newQuestionID,
			"text": newQuestionText
		};
		var newQIndex = this.state.q_index + 1;
		var updated_questions = this.state.questions.concat([newQuestion]);
		this.setState({ 
			questions: updated_questions, 
			q_index: newQIndex,
			modal_info: Object.assign({}, this.state.modal_info, {
			  questions: updated_questions,
			}),
		});
	}

	alterQuestion(event, question_id) {
		var temp_questions = this.state.questions;
		var index = temp_questions.findIndex(item => item.id === question_id);
		temp_questions[index].text = event.target.value;
		this.setState({ 
			questions: temp_questions,
			modal_info: Object.assign({}, this.state.modal_info, {
			  questions: temp_questions,
			}),
		});
	}

	removeQuestion(question_id) {
		this.setState((prevState) => {
			var temp_questions = prevState.questions;
			var removeIndex = temp_questions.map(function(item) { return item.id; }).indexOf(question_id);
			temp_questions.splice(removeIndex, 1);
			return { questions: temp_questions,
				modal_info: Object.assign({}, this.state.modal_info, {
				  questions: temp_questions,
				}),
			};
		});
	}

	updateSkills(skills) {
		var new_modal_info = this.state.modal_info;
		new_modal_info.skills = skills;
		this.setState({ modal_info: new_modal_info });
	}

	render() {
		return (
			<div className='apply shift-down'>
				<div className='container center-align apply-form shadow'>
					<div className='apply-header'>Create Position Application</div>
					<div className="container">
						<form className='file-field'>
							<input className='apply-input' id="textInput" value={this.state.positionName} type="text" placeholder="Position Title" onChange={event => this.updatePositionName(event)}></input>
							<h2 className="apply-question-label">Position Description</h2>
							<textArea className='lab-text-info-input' id="textArea" type="text" placeholder="short description of position responsibilities" onChange={event => this.updatePositionDesc(event)}></textArea>
							<div className='row create-position-row'>
								<h2 className="apply-question-label col s7">Time Commitment</h2>
								<h2 className="apply-question-label col s5">Open Slots</h2>
							</div>
			  				<div className='row'>
			  					<div className="input-field col s3">
				                	<input className='gen-input' id='lower_bound_hours' type='number' step="1" placeholder='8' value={this.state.lowerHours} onChange={event => this.updateLowerHours(event)} />
				                	<label htmlFor="lower_bound_hours">Min Hours/Week</label>
				            	</div>
				            	<div className="input-field col s3">
					                <input className='gen-input' id='upper_bound_hours' type='number' step="1" placeholder='10' value={this.state.upperHours} onChange={event => this.updateUpperHours(event)} />
					                <label htmlFor="upper_bound_hours">Max Hours/Week</label>
					            </div>
	                        	<div className="input-field col s1">
	            	            </div>
	                        	<div className="input-field col s4">
	            	                <input className='gen-input' id='num_open_slots' type='number' step="1" value={this.state.numSlots} onChange={event => this.updateNumSlots(event)} />
	            	                <label htmlFor="num_open_slots"># Open Slots</label>
	            	            </div>
			  				</div>
			  				{/*							
							<h2 className="apply-question-label">Skills Required { this.state.positionName ? "for " + this.state.positionName + "-ing": null } </h2>
							<BubbleChoice display_info={this.state.display_info} callbackSkills={this.updateSkills}/>*/}
							<h2 className="apply-question-label">Short Answer Questions</h2>
							    {this.state.questions.map((question) => {
									return (
										<div className="row">
											<div className="col s11">
												{/*TODO: TURN TEXTAREA INTO A COMPONENT*/}
												<textarea id={question.id} type="text" className='question-input' id="apply-question-input" value={question.text} rows='3' onChange={event => this.alterQuestion(event, question.id)} required></textarea>
												
											</div>
											<div className="col s1">
												<a id={question.id} className="remove-question" onClick={() => this.removeQuestion(question.id)}><i className="material-icons interest-editor opacity-1">clear</i></a>
											</div>
										</div>);
								})}
							<a onClick={this.addQuestion.bind(this)} id="addQuestionCenter" > <i className="material-icons">add</i></a>
						</form>
						<ModalButton type="create_app" label="create application" info={this.state.modal_info}/>
					</div>
				</div>
			</div>
		);
	}
}

export default CreatePosition;