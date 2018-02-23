import React, {Component} from 'react';
import SquareButton from './SquareButton';
import ModalButton from './ModalButton';

class CreatePosition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			application_questions: [
				{
					"id": "q_1",
					"text": "Why are you interested in working for our lab?"
				},
				{
					"id": "q_2",
					"text": "How do your skills/experiences align with our lab work?"
				},
				{
					"id": "q_3",
					"text": "How much wood would a wood chuck chuck if a wood chuck *couldn't* chuck wood?"
				},
			]
		};
	}

	render() {
		return (
			<div className='apply shift-down'>
				<div className='container center-align apply-form shadow'>
					<div className='apply-header'>Apply to {this.state.lab_name}</div>
					<div className="container">
						<form className='file-field'>
						    {this.state.application_questions.map((question) => {
								return (
									<p><label className="apply-question-label" htmlFor={question.id}>{question.text}</label>
									<textArea id={question.id} type="text" id="apply-question-input" className="materialize-textarea" required /></p>);
							})}
						</form>
						<ModalButton /> 
					</div>
				</div>
			</div>
		);
	}
}

export default CreatePosition;