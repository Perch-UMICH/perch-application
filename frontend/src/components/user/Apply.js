import React, {Component} from 'react';
import AppQuestionTab from './AppQuestionTab';
import { getLabPosition, getLab, getPositionApplication, createApplication } from '../../helper.js';
import './Apply.css';

class Apply extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			applyHelpText: "To apply, fill out the questions below & click submit. A lab contact will reach out to you if it seems like a good match!",
		};
	}

	updateQuestions(questions) {
		if (this.props.updateQuestions) {
			this.props.updateQuestions(questions);
		}
	}

	componentDidMount() {
		// retreive lab id & pull application info.
		var url_arr = window.location.pathname.split('/');
		var lab_id = url_arr[2];
		var position_id = url_arr[3];

		this.setState({
			pos_description: this.props.description ? this.props.description : "You do interesting work.", //position.description,
			pos_name: "Cool Position", //position.title,
			time_comm: "5-10 hours",//position.time_commitment,
			open_slots: 2, //position.open_slots,
			questions: [
				{
					id: 1,
					question: "Why are you interested in this project?",
					response: "",
				},
				{
					id: 2,
					question: "What makes you a good fit to work in our lab?",
					response: "",
				},
			]
		});
	}

	render() {
		return (
			<div className="apply-wrapper">
				<div className="apply-descriptor"><b>Position Description: </b>{this.state.pos_description}</div>
				<div className="apply-descriptor"><b>Time Commitment: </b>{this.state.time_comm}</div>
				<div className="apply-descriptor"><b>Open Slots: </b>{this.state.open_slots}</div><br/>
				<div className="apply-help-text">{this.state.applyHelpText}</div>
				<AppQuestionTab updateQuestions={this.updateQuestions.bind(this)} questions={(this.state.questions && this.state.questions.length) ? this.state.questions : []} />
			</div>
		);
	}
}

export default Apply;
