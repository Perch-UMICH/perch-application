import React, {Component} from 'react';
import BasicButton from './BasicButton';
import $ from 'jquery';

class AppDisplayModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			student_name: this.props.info.name,
			tags: this.props.info.tags,
			profile_link: this.props.info.profile_link,
			student_slug: this.props.info.slug,
			questions: [
				{
					"question": "Why are you interested in working for our lab?",
					"response": "Isn't the question really, Why Not? B)"
				},
				{
					"question": "How do your skills/experiences align with our lab work?",
					"response": "Thanks to an early profession of dog fostering, I grew up around a lot of yellow retreivers - you could easily say I'm experienced in labrador work."
				},
				{
					"question": "How much wood would a wood chuck chuck if a wood chuck *couldn't* chuck wood?",
					"response": "If the wood chuck couldn't chuck wood, it would no longer be a wood chuck. Thus, by proof by contradiction, we have shown this question to be undecidable (proving that the elephant dilemma is Turing reducible to the wood chuck problem also would have sufficed)."
				},
			]
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
	    $("#displayModal" + this.state.student_slug).fadeOut("slow");
	    $('#modalBackdrop').fadeOut("slow");
	}

	render() {
		var modalId = "displayModal" + this.state.student_slug;
		var interviewDest = '/schedule-interview/' + this.state.student_slug;
		return(
			<div>
				<div id={modalId} class="modal modal-fixed-footer display-modal">
			 		<div class="modal-content">
				    	<h4>{this.state.student_name + "\'s Application"}</h4>
		    	        {this.state.questions.map((q) => {
		    	    		return (
		    	    			<p><b>{q.question}</b>
		    	    			<p>{q.response}</p></p>);
		    	    	})}
				   	</div>
				   	<div class="modal-footer">
				   		{/*<BasicButton onClick={this.onClick} msg='close' />*/}{/*@Emi: changed basic button so you can pass an on click function, but this functio relies on this.state*/}
				     	<BasicButton superClick={this.onClick} msg='close' />
				     	<BasicButton dest={this.state.profile_link} msg='view profile' />
				     	<BasicButton dest={interviewDest} msg='schedule interview' />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default AppDisplayModal;