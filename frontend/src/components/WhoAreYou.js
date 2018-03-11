import React, {Component} from 'react';
class WhoAreYou extends Component {

	componentDidMount() {
		var studentSection = document.getElementById('student-section');
		var profSection = document.getElementById('professor-section');
		var userPrompt = document.getElementById('user-prompt');
		var studentButton = document.getElementById('student-btn');
		var profButton = document.getElementById('prof-btn');
		studentButton.addEventListener('click', function() {
			userPrompt.classList.add('hide');
			studentSection.classList.remove('hide');
		})

		profButton.addEventListener('click', function() {
			userPrompt.classList.add('hide');
			profSection.classList.remove('hide');
		})

				// $("#student-btn").each(function ()
				// 	{
				// 	    $(this).click(function () {  
					      
				// 	      $('#user-prompt').delay(3000).addclassName("hide");                            
				// 	      $('#student-section').delay(3000).removeclassName("hide");        
				// 	    });
				// 	});

				// 	$("#prof-btn").each(function ()
				// 	{
				// 	    $(this).click(function () {  

				// 	      $('#user-prompt').addclassName("hide");                            
				// 	        $('#professor-section').removeclassName("hide");        
				// 	    });
				// 	});
	}
	render() {
		return (
			<div>
			  <div id="user-prompt" className="tab4 white-text valign-wrapper">
			    <div className="row center-align" data-kui-anim="fadeIn">
			      <div className="header center-align">Who are you?</div>
			      <br /><br /><br />
			      <div id="student-btn" className="col s12 m6"><a href="javascript:void(0)" className="user-type-btn waves-effect btn-flat btn-large">Student</a></div>
			      //<div id="prof-btn" className="col s12 m6"><a href="javascript:void(0)" className="user-type-btn waves-effect btn-flat btn-large">Professor</a></div>
			    </div>
			  </div>

			    <div id="student-section" className="tab4 white-text center-align hide flow-text valign-wrapper">
				    <div className="container">
				      <div className="header center-align hide-on-small-only">Finding a lab is Awkward</div>
				      <div className="header-small center-align show-on-small hide-on-med-and-up">Finding a lab is Awkward</div>
				  
				      <br />
				      <div >
				        <ul className="left-align">
				          <blockquote className="flow-text white-text">Most research labs on campus aren’t organized to accommodate for undergrads</blockquote>
				          <blockquote className="flow-text white-text">Information about labs is often hard to find, and it’s hard to tell if they’re looking for assistants </blockquote>
				          <blockquote className="flow-text white-text">Contacting research faculty take a lot of work, since there are few opportunities for professors to connect with students on their research</blockquote>
				          <blockquote id="block-solution" className="flow-text white">We streamline the way students and university labs communicate, so that students can find the best fit for their academic passion.</blockquote>
				        </ul>
				      </div>
				    </div>
				  </div>

				  <div id="professor-section" className="tab4 white-text valign-wrapper hide center-align flow-text">
				    <div >
				      <div className="header center-align hide-on-small-only">Finding an assistant is awkward</div>
				      <div className="header-small center-align show-on-small hide-on-med-and-up">Finding assistant is awkward</div>
				      <div className="container flow-text">
				        <ul className="left-align">
				          <blockquote className='white-text'>Finding qualified undergrads is tough. Finding the best undergrad for your lab is even tougher</blockquote>
				          <blockquote className='white-text' >But training undergrads takes time and resources away from your projects</blockquote>
				          <blockquote className='white-text'>So some projects chug slowly or get put on the backburner</blockquote>
				          <blockquote id="block-solution" className=" white">We streamline the way students and university labs communicate, so that professors can find the best undergrads to fuel their projects.</blockquote>
				        </ul>
				      </div>
				    </div>
				  </div>
				  </div>
		);
	}
}

export default WhoAreYou;