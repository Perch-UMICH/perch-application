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
			student: false,
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
		return window.location.pathname.split( '/' )[2];
	}

	// Set's student ID into state for future use
	setStudentId(r) {
		this.setState({s_id: r.result.id})
		return this;
	}

	// Beginning point for data handling 
	componentDidMount() {
		getUser(this.retrieveSlug()).then(resp => {
			if (resp.result) {
				if (resp.result.is_student) {
					this.setState({ student: true });
					getStudentFromUser(this.retrieveSlug()).then(this.setStudentId.bind(this)).then(this.generalHandler.bind(this));
				}
			}
		});
	}

	render() {
		if (isLoggedIn() && this.state.student) {
	 	return (
	 		<div className='content-body'>
	 			<div className='shadow' id='left-column'>
	 				<AcademicsTab classes={this.state.classes} major={this.state.major} year={this.state.year} gpa={this.state.gpa}/>
	 				<PastResearchTab past_research={this.state.past_research}/>
	 				<div className='student-profile-linker'>Linkedin</div>
	 				<div className='student-profile-linker'>Resume</div>
	 				<div className='student-profile-linker'>Website</div>
	 			</div>
	 			<div id='right-column' className='shadow center-align'>
	 				<div className='ad'>AD</div>
	 				<div className='ad'>AD</div>
	 				<div className='ad'>AD</div>
	 			</div>
				<div className='container shift-down' id='center-column'>
					<div id='student-main-card' className='left-align shadow'>
						<img id='student-image' src={this.state.img_src} alt='' />
						{getCurrentUserId() === this.retrieveSlug() && 
							<a href='/update-student-bio'><i className="material-icons interest-editor">create</i></a>
						}
						<div id='bio-card'>
							<div id='bio-header' className='flow-text'>I'm <b>{this.state.name}</b></div>
							<div id='bio'>{this.state.bio}</div>
						</div>
					</div>

					<div id='tag-boxes' className='flex'>
						<div className='profile-tab shadow'><InterestsTab tabTitle="INTERESTS" user_type="student" interests={this.state.interests} /></div>
						<div className='profile-tab shadow'><SkillsTab user_type="student" skills={this.state.skills}/></div>
					</div>
				
				</div>
			</div>
			
		);
	 }
	 else if (!isLoggedIn()){
	 	return <ErrorPage />
	 } else {
	 	return <div><br/> Not a student, man - check your url </div>
	 }
	}
}

export default StudentProfile;