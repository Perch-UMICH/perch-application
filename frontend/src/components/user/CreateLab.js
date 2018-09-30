import React, {Component} from 'react';
import AppQuestionTab from './AppQuestionTab';
import { getLabPosition, getLab, getPositionApplication, getCurrentUserId, createApplication, createLab, updateLab, addMembersToLab, getCurrentFacultyId, getAllLabData, getAllLabs, isFaculty } from '../../helper.js';
import './CreateLab.css';

export var modalCreateLab = (lab) => {
	if (isFaculty()) {
		console.log("Attempting to create lab ...");
		console.log(lab);
		createLab(getCurrentFacultyId(), lab).then(r => {
			console.log(r);
			alert("lab created!!!");
		})
	}
}

export var modalUpdateLab = (lab) => {
	if (isFaculty()) {
		console.log("Attempting to update lab ...");
		console.log(lab);
		addMembersToLab([getCurrentUserId()], [1]).then(r => {
			updateLab(lab.id, lab).then(r => {
				console.log(r);
				alert("lab updated!!!");
			})
		})
	}
}

class CreateLab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab: {
				name: "",
				description: "",
				publications: "",
				url: "",
				location: "",
				contact_phone: "",
				contact_email: "",
				labpic_path: "",
				id: "",
			}
		};
	}

	updateQuestions(questions) {
		if (this.props.updateQuestions) {
			this.props.updateQuestions(questions);
		}
	}

	alterObj(e) {
		let lab = this.state.lab;
		lab[e.target.name] = e.target.value;
		this.setState(lab);
		if (this.props.updateLabState) {
			this.props.updateLabState(e.target.name, e.target.value);
		}
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
				{/*<br/><button onClick={this.modalCreateLab.bind(this)}>CREATE A NEW LAB!</button><br/><br/>*/}
				{/*<br/><button onClick={this.modalUpdateLab.bind(this)}>Update Lab! (Be sure to include the correct id below)</button><br/>*/}
				<b>Lab ID: (for updating labs)</b>
				<input type='text' name='id' value={this.state.lab.id} onChange={(e) => this.alterObj(e)}/>
			</div>
		);
	}
}

export default CreateLab;
