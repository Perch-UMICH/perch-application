import React, {Component} from 'react';
import SquareButton from './SquareButton';
import ModalButton from './ModalButton';
import AppQuestionTab from './AppQuestionTab';
import $ from 'jquery'
import './Apply.css';

class Apply extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			pos_name: "Lab Assistant",
			pos_description: "Our lab assistants are deeply involved in conducting and analyzing the results of our expriments. The majority of our studies use a habituation-dishabituation technique. The underlying principle is simple: we become bored when we are exposed to something in the environment over and over again.",
			skills: [
				"linguistic inquiry",
				"day reconstruction method",
				"patience with children",
			],
			questions: [
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
					<div className='apply-header'>Apply to {this.state.lab_name}:<br/>{this.state.pos_name}</div>
					<h2 className="app-question-tab-label">POSITION DESCRIPTION:</h2>
					<div className="container app-question-desc">{this.state.pos_description}</div> 
					<h2 className="app-question-tab-label">SKILLS REQUIRED:</h2>
					<div className="container">
					    {this.state.skills.map((skill) => {
							return (
								<div key={skill} className='floater-item'>{skill}</div>);
						})}
					</div><br/>
					<AppQuestionTab questions={this.state.questions} />
				</div>
			</div>
		);
	}
}

export default Apply;