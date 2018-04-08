import React, {Component} from 'react';
import AppQuestionTab from './AppQuestionTab';
import { getLabPositions, getLab, getPositionApplication } from '../helper.js';
import './Apply.css';

class Apply extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	componentDidMount() {
		var url_arr = window.location.pathname.split('/');
		var lab_id = url_arr[2];
		var position_id = url_arr[3];
		getLab(lab_id).then(resp => {
			if (resp.data) {
				this.setState({ lab_name: resp.data.name })
			}
		});
		getLabPositions(position_id).then(position => {
			console.log('position!');
			console.log(position);
			this.setState({ 
				pos_description: position.description,
				pos_name: position.title,
				time_comm: position.time_commitment,
				open_slots: position.open_slots,
			})
		});
		getPositionApplication(position_id).then(app => {
			console.log("application");
			console.log(app);
		})
	}

	render() {
		return (
			<div className='apply shift-down'>
				<div className='container center-align apply-form shadow'>
					<div className='apply-header'>Apply to {this.state.lab_name}:<br/>{this.state.pos_name}</div><br/>
					<div className="container app-question-desc">{this.state.pos_description}</div>
					<div className="container"> 
						<div className='floater-item'>{this.state.time_comm}</div>
						<div className='floater-item'>Open Slots: {this.state.open_slots}</div>
					</div><br/>
					{/*<h2 className="app-question-tab-label">SKILLS REQUIRED:</h2>
					<div className="container">
					    {this.state.skills.map((skill) => {
							return (
								<div key={skill} className='floater-item'>{skill}</div>);
						})}
					</div><br/>*/}
					<AppQuestionTab questions={this.state.questions} />
				</div>
			</div>
		);
	}
}

export default Apply;