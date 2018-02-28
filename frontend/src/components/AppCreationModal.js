import React, {Component} from 'react';
import BasicButton from './BasicButton'
import $ from 'jquery';

class AppCreationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: 'the-infant-cognition-project'
		};
		this.onClick = this.onClick.bind(this);
	}
	onClick(event) {
	    $('#createModal').fadeOut("slow");
	    $('#modalBackdrop').fadeOut("slow");
	}

	render() {
		var lab_dest = '/prof-page/' + this.state.slug;
		return(
			<div>
				<div id="createModal" class="modal modal-fixed-footer">
			 		<div class="modal-content">
				    	<h4>Review Application for { (this.props.info.positionName !== '') ? this.props.info.positionName : <i> [Unnamed] </i>}</h4>
				    	<h5>Position Description:</h5>
				    	{ (this.props.info.positionDesc !== '') ? this.props.info.positionDesc : <div><i>No description provided </i></div> }
				    	<h5>Skills Required:</h5>
			    	    {this.props.info.skills.map((skill) => {
			    			return (
			    				<p>{skill}</p>);
			    		})}
			    		{ (this.props.info.skills.length === 0) ? <div><i>No specific skills selected</i></div> : null }
				    	<h5>Short Answer Questions:</h5>
			    	    {this.props.info.questions.map((question) => {
			    			return (
			    				<p>{question.text}</p>);
			    		})}
			    		{ (this.props.info.questions.length === 0) ? <div><i>No short answer questions provided</i></div> : null }
				   	</div>
				   	<div class="modal-footer">
				   		<BasicButton superClick={this.onClick} msg='Edit' />
				   		<BasicButton dest={lab_dest} msg='Post Application' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default AppCreationModal;