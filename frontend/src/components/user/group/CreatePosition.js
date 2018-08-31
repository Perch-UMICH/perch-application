import React, {Component} from 'react';
import SquareButton from '../../utilities/buttons/SquareButton';
import ModalButton from '../../utilities/buttons/ModalButton';
import BubbleChoice from '../../utilities/BubbleChoice';
import './CreatePosition.css';

class CreatePosition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "",
			createHelpText: "Create a new group project! First, fill out some quick project information.",
			createApplyHelpText: "Next, add or edit questions you'd like to see answered by applicants to your lab.",
			positionName: '',
			questions: [
				{
					"id": "q_0",
					"text": "Why are you interested in this project?"
				},
				{
					"id": "q_1",
					"text": "What makes you a good fit to work in our lab?"
				},
			],
			lowerHours: 8,
			upperHours: 10,
			numSlots: 1,
			q_index: 0,
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
	}

	// send position updates to parent
	updateNewPosState(name, value) {
		if (this.props.updateNewPosState)
			this.props.updateNewPosState(name, value)
	}

	updatePositionName(event) {
		this.setState({
		    positionName: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      positionName: event.target.value,
		    }),
		});
		this.updateNewPosState('title', event.target.value)
	}

	updatePositionDesc(event) {
		this.setState({
		    modal_info: Object.assign({}, this.state.modal_info, {
		      positionDesc: event.target.value,
		    }),
		})
		this.updateNewPosState('description', event.target.value)
	}

	updateLowerHours(event) {
		this.setState({
			lowerHours: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      lowerHours: event.target.value,
		    }),
		});
		this.updateNewPosState('time_commitment', `${event.target.value}-${this.state.upperHours}`)
	}

	updateUpperHours(event) {
		this.setState({
			upperHours: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      upperHours: event.target.value,
		    }),
		});
		this.updateNewPosState('time_commitment', `${this.state.lowerHours}-${event.target.value}`)
	}

	updateNumSlots(event) {
		this.setState({
			numSlots: event.target.value,
		    modal_info: Object.assign({}, this.state.modal_info, {
		      numSlots: event.target.value,
		    }),
		});
		this.updateNewPosState('open_slots', event.target.value)
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
		this.updateNewPosState('questions', updated_questions)
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
		this.updateNewPosState('questions', temp_questions)
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
			this.updateNewPosState('questions', temp_questions)
		});
	}

	render() {
		return (
			<div className='center-align'>
					<form className='file-field'>
						<div className="apply-help-text">{this.state.createHelpText}</div>
						<h2 className="apply-question-label"><b>Title & Description</b></h2>
						<input value={this.state.positionName} type="text" placeholder="Project Title" onChange={event => this.updatePositionName(event)}></input>
						<textArea className="textarea-experience" id="textArea" type="text" placeholder="short description of project and responsibilities for workers on project team" onChange={event => this.updatePositionDesc(event)}></textArea>
						<div className='row create-position-row'>
							<h2 className="apply-question-label col s7"><b>Time Commitment</b></h2>
							<h2 className="apply-question-label col s5"><b>Open Slots</b></h2>
						</div>
		  				<div className='row create-position-row-input'>
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
		  			<div className="apply-help-text">{this.state.createApplyHelpText}</div>
						<h2 className="apply-question-label"><b>Project Application Questions</b></h2>
						    {this.state.questions.map((question) => {
								return (
									<div key={`${question.id}-q`} className="row create-position-row-input">
										<div className="col s11">
											{/*TODO: TURN TEXTAREA INTO A COMPONENT*/}
											<textarea id={question.id} type="text" className="textarea-experience" id="apply-question-input" value={question.text} rows='3' onChange={event => this.alterQuestion(event, question.id)} required></textarea>

										</div>
										<div className="col s1">
											<a id={question.id} className="remove-question" onClick={() => this.removeQuestion(question.id)}><i className="material-icons interest-editor opacity-1">clear</i></a>
										</div>
									</div>);
							})}
						<a onClick={this.addQuestion.bind(this)} id="addQuestionCenter" > <i className="material-icons">add</i></a>
						<br/><br/>
					</form>
				</div>
		);
	}
}

export default CreatePosition;
