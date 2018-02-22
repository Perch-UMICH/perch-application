import React, {Component} from 'react';
import SquareButton from './SquareButton';
import './Apply.css';

class Apply extends Component {
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
					"text": "How much wood chuck chuck if a wood chuck *couldn't* chuck wood?"
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
						<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

						<div id="modal1" class="modal">
						    <div class="modal-content">
								<h4>Modal Header</h4>
								<p>A bunch of text</p>
						    </div>
						    <div class="modal-footer">
								<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
						    </div>
						 </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Apply;