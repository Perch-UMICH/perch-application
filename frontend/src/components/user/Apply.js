import React, {Component} from 'react';
import AppQuestionTab from './AppQuestionTab';
import './Apply.css';

class Apply extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			position: this.props.position || {},
			applyHelpText: "Let the lab get to know you! It's like tinder... but a lab",
		};
	}

	updateQuestions(questions) {
		if (this.props.updateQuestions) {
			this.props.updateQuestions(questions);
		}
	}

	componentDidMount() {
		this.setState({
			pos_description: this.state.position.description || "No description provided.",
			time_comm: this.state.position.min_time_commitment || "No minimum time provided.",
			min_qual: this.state.position.min_qual,
			questions: [ // currently using default two questions, could make position-specific
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
				<div className="apply-descriptor"><b>Time Commitment: </b>{this.state.time_comm} hours per week</div>
				{this.state.min_qual && <div className="apply-descriptor"><b>Minimum Qualifications: </b>{this.state.min_qual}</div>}
				<AppQuestionTab updateQuestions={this.updateQuestions.bind(this)} questions={(this.state.questions && this.state.questions.length) ? this.state.questions : []} />
			</div>
		);
	}
}

export default Apply;
