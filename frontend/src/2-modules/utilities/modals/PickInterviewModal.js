import React, {Component} from 'react';
import BasicButton from '../buttons/BasicButton';
import $ from 'jquery';

class PickInterviewModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			slug: 'the-infant-cognition-project'
		};
		this.fadeModal = this.fadeModal.bind(this);
	}

	fadeModal(event) {
		$('#modalBackdrop').fadeOut("slow");
		$('#pickModal').fadeOut('slow');
	}

	render() {
		//var lab_dest = '/prof-page/' + this.state.slug;
		return(
			<div>
				<div id="pickModal" className="modal">
			 		<div className="modal-content">
				    	<p>Set an interview with <i>{this.props.interview.lab}</i> on {this.props.interview.slot.day}, {this.props.interview.slot.month} {this.props.interview.slot.date}, {this.props.interview.slot.year} from {this.props.interview.slot.startTime} to {this.props.interview.slot.endTime} at {this.props.interview.slot.location}?</p>
				   	</div>
				   	<div className="modal-footer">
				   		<BasicButton superClick={this.fadeModal} msg='Choose Different Slot' />
				   		<BasicButton superClick={this.props.confirm} msg='Confirm' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default PickInterviewModal;