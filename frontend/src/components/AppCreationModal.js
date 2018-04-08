import React, {Component} from 'react';
import BasicButton from './BasicButton'
import {createLabPosition} from '../helper.js';
import $ from 'jquery';

class AppCreationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: 'the-infant-cognition-project'
		};
		this.onClick = this.onClick.bind(this);
		this.postApplication = this.postApplication.bind(this);
	}

	onClick(event) {
		// add time commitment, open slots, is 'open' a boolean?
	    $('#createModal').fadeOut("slow");
	    $('#modalBackdrop').fadeOut("slow");
	}

	postApplication(event) {
		createLabPosition(1, this.props.info.positionName, this.props.info.positionDesc, $('#time_commitment').val(), this.props.numSlots).then(resp => {
			console.log("CREATED POSITION");
			console.log(resp);
		});
	}

	render() {
		return(
			<div>
				<div id="createModal" class="modal modal-fixed-footer">
			 		<div class="modal-content">
				    	<h5>Review Application for { (this.props.info.positionName !== '') ? this.props.info.positionName : <i> [Unnamed] </i>}</h5>
				    	<div><b>Position Description:</b></div>
				    	<div className="description-text">
				    	{ (this.props.info.positionDesc !== '') ? this.props.info.positionDesc : <div><i>No description provided </i></div> }
				    	</div>
				    	<div className="inline modal-small-header"><b>Time Commitment: </b></div>
				    	<div className="inline" id="time_commitment"> {this.props.info.lowerHours}-{this.props.info.upperHours} hours/week</div><br/>
				    	<div className="inline modal-small-header description-text"><b>Open Slots:</b></div>
				    	<div className="inline"> {this.props.info.numSlots} </div>
				    	{/*<h5>Skills Required:</h5>
			    	    {this.props.info.skills.map((skill) => {
			    			return (
			    				<p>{skill.name}</p>);
			    		})}
			    		{ (this.props.info.skills.length === 0) ? <div><i>No specific skills selected</i></div> : null }*/}
				    	<div><b>Short Answer Questions:</b></div>
			    	    {this.props.info.questions.map((question) => {
			    			return (
			    				<p>{question.text}</p>);
			    		})}
			    		{ (this.props.info.questions.length === 0) ? <div><i>No short answer questions provided</i></div> : null }
				   	</div>
				   	<div class="modal-footer">
				   		<BasicButton superClick={this.onClick} msg='Edit' />
				   		<BasicButton superClick={this.postApplication} msg='Post Application' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default AppCreationModal;