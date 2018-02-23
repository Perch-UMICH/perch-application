import React, {Component} from 'react';

class AppSubmissionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			slug: 'the-infant-cognition-project'
		};
	}

	render() {
		var lab_dest = '/prof-page/' + this.state.slug;
		return(
			<div>
				<div id="submitModal" className="modal">
			 		<div className="modal-content">
				    	<h4>Application Submitted!</h4>
				    	<p>Your application has been successfully submitted to <i>{this.state.lab_name}</i>.<br/> 
				    	   We'll notify you if they think it's a match.</p>
				   	</div>
				   	<div className="modal-footer">
				     	<a href={lab_dest} className="modal-action modal-close waves-effect waves-green btn-flat modal-btn">Return to Lab Page</a>
				     	<a href="/student-profile" className="modal-action modal-close waves-effect waves-green btn-flat modal-btn">Return to Profile</a>
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default AppSubmissionModal;