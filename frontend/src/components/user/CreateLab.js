import React, {Component} from 'react';
import AppQuestionTab from './AppQuestionTab';
import { getLabPosition, getLab, getPositionApplication, getCurrentUserId, createApplication, createLab, updateLab, addMembersToLab, getCurrentFacultyId, getAllLabData, getAllLabs, isFaculty } from '../../helper.js';
import './CreateLab.css';

class CreateLab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			lab: {
				name: "neat_lab2",
				description: "neat_lab2",
				publications: "neat_lab2",
				url: "neat_lab2",
				location: "neat_lab2",
				contact_phone: "neat_lab2",
				contact_email: "neat_lab2",
				labpic_path: "neat_lab2",
			}
		};
	}

	updateQuestions(questions) {
		if (this.props.updateQuestions) {
			this.props.updateQuestions(questions);
		}
	}

	createNewLab() {
		if (isFaculty()) {
			console.log("Attempting to create lab ...");
			createLab(getCurrentFacultyId(), this.state.lab).then(r => {
				console.log(r);
				alert("lab created!!!");
			})
		}
	}

	updateLab() {
		if (isFaculty()) {
			console.log("Attempting to create lab ...");
			addMembersToLab([getCurrentUserId()], [1]).then(r => {
				updateLab(this.state.id, this.state.lab).then(r => {
					console.log(r);
					alert("lab updated!!!");
				})
			})
		}
	}

	alterObj(e) {
		let lab = this.state.lab;
		lab[e.target.name] = e.target.value;
		this.setState(lab);
	}

	componentDidMount() {
		getAllLabs().then(r => {
			console.log("trying to get all labs!", r);
		})
	}

	render() {
		return (
			<div className="create-lab-wrapper">
				<b>Name</b>
				<input type='text' name='name' value={this.state.lab.name} onChange={(e) => this.alterObj(e)}/>
				<b>Description</b>
				<input type='text' name='description' value={this.state.lab.description} onChange={(e) => this.alterObj(e)}/>
				<b>Publications</b>
				<input type='text' name='publications' value={this.state.lab.publications} onChange={(e) => this.alterObj(e)}/>
				<b>URL</b>
				<input type='text' name='url' value={this.state.lab.url} onChange={(e) => this.alterObj(e)}/>
				<b>Location</b>
				<input type='text' name='location' value={this.state.lab.location} onChange={(e) => this.alterObj(e)}/>
				<b>Contact Phone</b>
				<input type='text' name='contact_phone' value={this.state.lab.contact_phone} onChange={(e) => this.alterObj(e)}/>
				<b>Contact Email</b>
				<input type='text' name='contact_email' value={this.state.lab.contact_email} onChange={(e) => this.alterObj(e)}/>
				<b>LabPic Path</b>
				<input type='text' name='labpic_path' value={this.state.lab.labpic_path} onChange={(e) => this.alterObj(e)}/>
				<br/><button onClick={this.createNewLab.bind(this)}>CREATE A NEW LAB!</button><br/><br/>
				<br/><button onClick={this.updateLab.bind(this)}>Update Lab! (Be sure to include the correct id below)</button><br/>
				<b>Lab ID: (for updating labs)</b>
				<input type='text' name='id' value={this.state.id} onChange={(e) => this.setState({id: e.target.value})}/>
			</div>
		);
	}
}

export default CreateLab;
