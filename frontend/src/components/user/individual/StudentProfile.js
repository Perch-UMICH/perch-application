import React, {Component} from 'react';
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin, getStudentFromUser, getStudentTags, getStudentSkills, getUser, updateStudent} from '../../../helper.js'
import ErrorPage from '../../utilities/ErrorPage'
import ExpanderIcons from '../../utilities/ExpanderIcons'
import Editor from '../../utilities/Editor'
import EditModal from '../../utilities/modals/EditModal'
import {EditContact, EditExperience, EditQuickview, EditLinks, EditBio} from './StudentEditors'
import NotableClasses from './NotableClasses'
import PickYourInterests from './PickYourInterests'
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import './StudentProfile.css';

var FontAwesome = require('react-fontawesome');

class StudentProfile extends Component {
	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
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
			classes: [],
			not_student: false,
			tempskills: ['python', 'javascript', 'HTML 5', 'CSS 3', 'C++', 'Splunk', 'matLab'],
			tempinterests: ['Computer Science', 'Computer Security', 'Software Development', 'Management', 'Design'],
			user: {},
		}
	}

	updateUser(field, newValue) {
    console.log("updating ", field, " to ", newValue);
    var newState = this.state;
    newState.user[field] = newValue;
    this.setState(newState);
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
				console.log(resp);
				var class_arr = [];
				if (resp.data.classes) {
					class_arr = resp.data.classes.split('|');
				}
	            this.setState(
	            	{
	            		name: `${resp.data.first_name} ${resp.data.last_name}`,
	            		gpa: resp.data.gpa,
	            		major: resp.data.major,
	            		year: resp.data.year,
	            		bio: resp.data.bio,
	            		email: resp.data.email,
	            		classes: class_arr,
	            		experience: resp.data.experiences,
	            		linkedin: resp.data.linkedin_link,
	            		resume: resp.data.resume_path,
	            		student: true,
	            		s_id: resp.data.id,
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
		// getUser(this.retrieveSlug()).then(resp => {
		// 	if (resp.data) {
		// 		if (resp.data.is_student) {
		// 			this.generalHandler();
		// 		} else {
		// 			this.setState({ not_student: true });
		// 		}
		// 	} else {
		// 		this.setState({ not_student: true });
		// 	}
		// });
		this.generalHandler();
		// updateStudent(1, null, null, null, null, null, null, null, "experience1|experience2", "class1|class2")
	}

	// Handles opening of component editing modals
	openModal(id) {
		if (document.getElementById(id)) {
			document.getElementById(id).classList.add('activated');
			document.getElementById("greyBackdrop").classList.add('activated');
		}
	}

	//
	saveProfile() {
		// should update and save profile from changes made during edit.
	}

	render() {
		// if (!isLoggedIn()) {
		// 	return <ErrorPage />
		// } else if (this.state.not_student) {
		// 	return <ErrorPage fourofour="true" />
		// } else {
	 	return (
	 		<div id='user-content-body'>
				<div id="greyBackdrop" className="modal-backdrop"></div>
				<EditModal id="skills-interests-edit" title="Edit Skills and Interests" noPadding={true}>
					<PickYourInterests editorOnly={true} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="contact-edit" title="Edit Contact Info">
					<EditContact  updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="link-edit" title="Edit Links">
					<EditLinks  updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="academics-edit" title="Edit Academic Info">
					<NotableClasses  updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="work-edit" title="Edit Work Info">
					<EditExperience type="work" updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="education-edit" title="Edit Education Info">
					<EditExperience type="educ" updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="bio-edit" title="Edit Bio">
					<EditBio updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="quickview-edit" title="Edit Quickview Info">
					<EditQuickview img='/img/headshots/bbear.jpg' updateUser={this.updateUser.bind(this)}/>
				</EditModal>
	 			<div id='user-column-L'>
	 				<div>
	 					<h1>Academics</h1>
	 					<div>
	 						<div><b>GPA</b> NULL</div>
	 						<div><b>Year</b> {this.state.year}</div>
	 						<StudentClasses list={this.state.classes}/>
	 					</div>
	 					<Editor superClick={() => this.openModal('academics-edit')}/>
	 				</div>
	 				<div>
	 					<h1>Contact</h1>
	 					<div>
	 						<div id='user-email'><b>Email</b> <a href={`mailto:${this.state.email}`}>{this.state.email}</a></div>
	 						<div><b>Phone</b> MISSING</div>
	 					</div>
	 					<Editor superClick={() => this.openModal('contact-edit')}/>
	 				</div>
	 				<div id='user-links'>
	 					<h1>Links</h1>
	 					<div>
	 						<a style={{textAlign: 'left', textDecoration: 'underline'}}>LinkedIn (No Link yet, path NULL)</a>
	 						<a style={{textAlign: 'left', textDecoration: 'underline'}}>Resume (No Link yet, path NULL)</a>
	 					</div>
	 					<Editor superClick={() => this.openModal('link-edit')}/>
	 				</div>
	 			</div>
	 			<div id='user-column-R'>
	 				<TwitterTimelineEmbed
					  sourceType="profile"
					  screenName="UROPumich"
					  options={{height: 'calc(100vh - 200px)'}}
					/>
	 			</div>
	 			<div id='user-profile-column-C'>
	 				<div id='user-quickview'>
	 					<div id='user-quickview-img-container'>
	 						<img id='user-quickview-img' src='/img/headshots/bbear.jpg'/>
	 					</div>
	 					<div style={{position: 'relative'}}>
		 					<img id='user-quickview-coverimage' src='https://d1w9csuen3k837.cloudfront.net/Pictures/1120xAny/0/8/1/135081_Index-and-hero---A-picture-is-worth-a-thousand-word.jpg' />
		 					<div id='user-quickview-footer'>
								MISSING (UNIVERSITY)
							</div>
		 					<div id='user-quickview-name'>{this.state.name}</div>
	 					</div>
	 					<SkillsInterests skills={this.state.tempskills} interests={this.state.tempinterests}/>
	 					<Editor superClick={() => this.openModal('quickview-edit')}/>
	 				</div>
	 				<div id='user-bio'>
	 					<h1>Bio</h1>
	 					<UserBio>NULL</UserBio>
	 					<Editor superClick={() => this.openModal('bio-edit')}/>
	 				</div>
	 				<div>
	 					<h1>Experience</h1>
	 					<UserWorkExperience title={this.state.experience} description="MISSING" startTime='MISSING' endTime='MISSING'/>
	 					<Editor superClick={() => this.openModal('work-edit')}/>
	 				</div>
	 				<div id='user-education'>
	 					<h1>Education</h1>
	 					<UserEducation title='MISSING' description='MISSING' startTime='MISSING' endTime='MISSING'/>
	 					<Editor superClick={() => this.openModal('education-edit')}/>
	 				</div>
	 			</div>
			</div>

		);
	 }
	// }
}


class StudentClasses extends Component {
	expand() {
		let elem = document.getElementById('user-classes-expander')
		elem.innerHTML = elem.innerHTML === 'expand_more' ? 'expand_less' : 'expand_more'
		document.getElementById('user-classes').classList.toggle('active-blue')
		document.getElementById('user-classes-list').classList.toggle('expand');
	}

	render() {
		return(
			<div id='user-classes' >
				<span onClick={this.expand.bind(this)}>
					Notable Classes
					<i className="material-icons" id='user-classes-expander'>expand_more</i>
				</span>
				<div id='user-classes-list'>
					{this.props.list.map(item => <div>{item}</div>)}
				</div>
			</div>
		)
	}
}

class UserWorkExperience extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showExpander: false,
		}
	}

	componentDidMount() {
		if (this.props.description.length >= 250)
			this.setState({showExpander: true})
	}

	expand() {
		document.getElementById(`user-work-description-${this.props.title}`).classList.toggle('expand')
	}

	render() {
		return(
			<div id={`user-work-${this.props.title}`} className='user-work-experience'>
				<div className='user-work-title'>{this.props.title}</div>
				<div className='user-work-time'>
					{`${this.props.startTime} - ${this.props.endTime}`}
				</div>
				<div id={`user-work-description-${this.props.title}`} className='user-work-description'>{this.props.description}</div>
				{this.state.showExpander && <ExpanderIcons id={`user-work-${this.props.title}`} action={this.expand.bind(this)}/>}
			</div>
		)
	}
}

class UserEducation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showExpander: false,
		}
	}

	expand() {
		document.getElementById(`user-education-description-${this.props.title}`).classList.toggle('expand')
	}

	render() {
		return(
			<div id={`user-education-${this.props.title}`} className='user-education'>
				<div className='user-education-title'>{this.props.title}</div>
				<div className='user-education-time'>
					{`${this.props.startTime} - ${this.props.endTime}`}
				</div>
				<div id={`user-education-description-${this.props.title}`} className='user-education-description'>{this.props.description}</div>
				{this.state.showExpander && <ExpanderIcons id={`user-education-${this.props.title}`} action={this.expand.bind(this)}/>}
			</div>
		)
	}
}

class UserBio extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showExpander: false,
		}
	}

	componentDidMount() {
		if (this.props.children.length >= 380)
			this.setState({showExpander: true})
	}

	expand() {
		document.getElementById('user-bio-content').classList.toggle('expand')
	}

	render() {
		return(
			<div id='user-bio' className='user-bio'>
				<div id='user-bio-content' className='user-bio-content'>{this.props.children} </div>
				{this.state.showExpander && <ExpanderIcons id={`user-bio`} action={this.expand.bind(this)}/>}
			</div>
		)
	}
}

class SkillsInterests extends Component {
	openModal(id) {
		if (document.getElementById(id)) {
			document.getElementById(id).classList.add('activated');
			document.getElementById("greyBackdrop").classList.add('activated');
		}
	}

	render(){
		return(
			<div id='user-skills-interests'>
				<Editor superClick={() => this.openModal('skills-interests-edit')}/>
				{this.props.interests.map((item) => <Bubble type='interest'>{item}</Bubble>)}
				{this.props.skills.map((item) => <Bubble type='skill'>{item}</Bubble>)}
			</div>
		)
	}
}

class Bubble extends Component {
	render(){
		return(
			<span className='bubble-container'>
				<div className={this.props.type == 'skill' ? 'skill' : 'interest'}>
					{this.props.children}
				</div>
			</span>
		)
	}
}

export default StudentProfile;
