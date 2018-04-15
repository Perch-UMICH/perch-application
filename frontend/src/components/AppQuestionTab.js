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
					    	var key1 = question.id + "_p";
					    	var key2 = question.id + "_text_input";
							return (
								<p key={key1}><label className="apply-question-tab-label" htmlFor={question.id}>{question.question}</label>
								<textArea key={key2} id={question.id} type="text" id="apply-question-input" className="materialize-textarea" required /></p>);
						})}
					</form>
					<ModalButton type="submit_app" label="submit"/> 
				</div>
			</div>
		);
	}
}

export default AppQuestionTab;