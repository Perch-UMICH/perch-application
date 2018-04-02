import React, {Component} from 'react';
import SquareButton from './SquareButton';
import SkillsTab from './SkillsTab';
import InterestsTab from './InterestsTab';
import BioTab from './BioTab';
import AcademicsTab from './AcademicsTab';
import PastResearchTab from './PastResearchTab';
import Endorsements from './Endorsements'
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin, getStudentFromUser, getStudentTags, getStudentSkills, getUser} from '../helper.js'
import ErrorPage from './ErrorPage'
import $ from 'jquery'
import './StudentProfile.css';

var FontAwesome = require('react-fontawesome');

class StudentProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img_src: '/img/meha.jpg',
			endorsements: [
				{
					name: 'Dr. Ed Einstein',
					url: '/prof-page'
				},
				{
					name: 'Dr. Mary Poppins',
					url: 'prof-page'
				},
			],
		}
	}

	// Handles retrieving skilsl and tags
	retrieveTags() {
		getStudentTags(this.state.s_id).then(r => this.setState({interests: r}))
		getStudentSkills(this.state.s_id).then(r => this.setState({skills: r}))
	}
	
	// Handles data for page
	generalHandler() {
			let id = this.retrieveSlug();
			getStudentFromUser(id).then((resp) => {
				console.log(resp)
	            this.setState(
	            	{
	            		name: `${resp.result.first_name} ${resp.result.last_name}`,
	            		gpa: resp.result.gpa,
	            		major: resp.result.major,
	            		year: resp.result.year,
	            		bio: resp.result.bio,
	            		email: resp.result.email,
	            		classes: resp.result.classes,
	            		past_research: resp.result.past_research,
	            	}
	            );
	            
	        }).then(this.retrieveTags.bind(this));
	}

	// Retrives slug from url
	retrieveSlug() {
		return window.location.pathname.split( '/' )[2]
	}

	// Set's student ID into state for future use
	setStudentId(r) {
		this.setState({s_id: r.result.id})
		return this;
	}

	// Beginning point for data handling 
	componentDidMount() {
		getStudentFromUser(this.retrieveSlug()).then(this.setStudentId.bind(this)).then(this.generalHandler.bind(this))
	}

	render() {
		if (isLoggedIn()) {
	 	return (
	 		<div className='center-align' style={{minWidth: '1300px', position: 'relative', overflowY: 'hidden'}}>
	 			<div className='shadow shift-down' style={{position: 'absolute', left: '15px', backgroundColor: '#ddd', minHeight: '1000px', width: '220px',}}>
	 				<AcademicsTab classes={this.state.classes} major={this.state.major} year={this.state.year} gpa={this.state.gpa}/>
	 				<PastResearchTab past_research={this.state.past_research}/>
	 			</div>
	 			<div className='shadow shift-down' style={{position: 'absolute', right: '15px', backgroundColor: '#ddd', minHeight: '1000px', width: '220px',}}>
	 				<div className='ad'>AD</div>
	 				<div className='ad'>AD</div>
	 				<div className='ad'>AD</div>
	 			</div>
				<div className='container shift-down' style={{width: '800px'}}>
						<div className='left-align' style={{height: '230px', width: '800px', marginBottom: '0', backgroundColor: '#ddd', position: 'relative', border: '1px solid #ddd', borderBottom: 'none'}}>
							<img src={this.state.img_src} style={{width: '230px'}} />
							<div style={{position: 'absolute', top: '30px', left: '250px', color: 'grey', letterSpacing: '0px'}}>
								<div className='flow-text' >I'm <b>{this.state.name}</b></div>

								{/*<div style={{paddingTop: '20px'}}>{this.state.bio}</div>*/}
								<div>Interested in Fluid Dynamics</div>
								<hr />
								<div>GPA: {this.state.gpa}</div>
								<div>{this.state.major} Major</div>
								<div>{this.state.year}</div>
								<div>{this.state.email}</div>
							</div>
						</div>
						<div className='center-align' style={{height: '50px', color: 'white', backgroundColor: 'rgb(41, 182, 246)', width: '800px', marginBottom: '20px', lineHeight: '50px', border: '1px solid #ddd', borderTop: 'none'}}>
							<span>LinkedIn</span>
							<span style={{marginLeft: '40px'}}>Resume</span>
							<span style={{marginLeft: '40px'}}>Website</span>
							<span style={{marginLeft: '40px'}}>Portfolio</span>
						</div>

					{<div className=''>

						{
							<div>
								<div className='' style={{backgroundColor: '#ddd', width: '800px', marginBottom: '20px'}} > 
									<div style={{display: 'flex'}}>
										<div style={{display: 'flex', width: '100%'}}><BioTab header='bio' user_type='student' msg={this.state.bio}/></div>
						
									</div>
								</div>

							</div>
						}

						
						
						<div className='flex' style={{width: '800px',  marginBottom: '20px'}}>
							<div className='profile-tab shadow' style={{width: '450px'}}><InterestsTab tabTitle="INTERESTS" user_type="student" interests={this.state.interests} /></div>
							<div className='profile-tab shadow' style={{width: '450px'}}><SkillsTab user_type="student" skills={this.state.skills}/></div>
						</div>
						{/*<div className='flex' style={{width: '800px', marginBottom: '20px'}}>
							<div className='profile-tab shadow' style={{width: '50%'}}><AcademicsTab classes={this.state.classes} major={this.state.major} year={this.state.year} gpa={this.state.gpa}/></div>
							<div className='profile-tab shadow' style={{width: '50%'}}><PastResearchTab past_research={this.state.past_research}/></div>
						</div>*/}
					</div>}
				</div>
			</div>
			
		);
	 }
	 else {
	 	return <ErrorPage />
	 }
	}
}

export default StudentProfile;