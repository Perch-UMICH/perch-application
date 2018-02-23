import React, {Component} from 'react';
import ModalButton from './ModalButton';
import './AppQuestionTab.css';

class AppQuestionTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app-question-tab" id="appQuestionTab">
				<div className='app-question-tab-header'>APPLICATION QUESTIONS</div>
				<div className='app-question-tab-body'>
					<form className='file-field'>
					    {this.props.questions.map((question) => {
							return (
								<p><label className="apply-question-tab-label" htmlFor={question.id}>{question.text}</label>
								<textArea id={question.id} type="text" id="apply-question-input" className="materialize-textarea" required /></p>);
						})}
					</form>
					<ModalButton type="submit_app" label="submit"/> 
				</div>
			</div>
		);
	}
}

export default AppQuestionTab;