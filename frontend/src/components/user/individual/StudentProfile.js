import React, {Component} from 'react';
import {getStudent, isLoggedIn, getCurrentUserId, getCurrentStudentId, addTagsToStudent, removeWorkExperiencesFromStudent, createAndAddClassExperiencesToStudent, addWorkExperiencesToStudent, addSkillsToStudent, verifyLogin, getStudentFromUser, getStudentTags, getStudentSkills, getUser, updateStudent} from '../../../helper.js'
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
			tempskills: [{name: 'python'}, {name: 'javascript'}, {name: 'HTML 5'}, {name: 'CSS 3'}, {name: 'C++'}, {name: 'Splunk'}, {name: 'matLab'}],
			tempinterests: [{name: 'Computer Science'}, {name: 'Computer Security'}, {name: 'Software Development'}, {name: 'Management'}, {name: 'Design'}],
			user: {
				name: "",
				gpa: "",
				major: "",
				year: "",
				bio: "",
				email: "",
				classes: [],
				experience: [],
				linkedin: "",
				skills: [],
				interests: [],
				resume: "",
				student: true,
				s_id: "",
				work_experiences: [],
			},
			updated_user: {}
		}
	}

	updateUser(field, newValue) {
    var newState = this.state;
    newState.updated_user[field] = newValue;
    this.setState(newState);
  }

	sendUpdate() {
		var updated_user = this.state.updated_user;
		var nameArr = updated_user && updated_user.name ? updated_user.name.split(' ') : [];
    var first_name = nameArr[0] ? nameArr[0]: "";
    var last_name = nameArr[1] ? nameArr[1] : "";
		// need school,
		var classes = "";
		var class_arr = [];
		if (updated_user.classes) {
			updated_user.classes.map(c => {
				classes += c.text + ',';
				class_arr.push(c.text);
			})
		}
		createAndAddClassExperiencesToStudent(class_arr).then(r => console.log("CLASS R", r));
		updateStudent(first_name, last_name, updated_user.email, updated_user.year, updated_user.bio, updated_user.major, updated_user.gpa, updated_user.classes, updated_user.experiences, updated_user.linkedin_link, updated_user.website_link)
		.then(r => {
			this.generalHandler();
		});
	}

	updateTags() {
		var skillIds = [];
		var intIds = [];
		var updated_user = this.state.updated_user;
		if (updated_user.skills && updated_user.skills.length) {
			updated_user.skills.map(skill => {
				skillIds.push(skill.id);
			})
		}
		if (updated_user.interests && updated_user.interests.length) {
			updated_user.interests.map(interest => {
				intIds.push(interest.id);
			})
		}
		addTagsToStudent(intIds).then(r => {
			addSkillsToStudent(skillIds).then(r => {
				this.generalHandler();
			});
		});
		console.log("adding skills", skillIds, "adding ints", intIds);
	}

	updateExperience() {
		removeWorkExperiencesFromStudent([1,2,3,4,5,6,7,8,9,10,11,12])
		if (this.state.updated_user.experience) {
			addWorkExperiencesToStudent(this.state.updated_user.experience).then(r => {
				console.log(r)
				this.generalHandler();
			});
		}
	}

	// Handles retrieving skilsl and tags
	retrieveTags() {
		var newState = this.state;
		var skills = [];
		var interests = [];
		getStudentSkills(getCurrentStudentId())
		.then(r => {
			if (r.data) {
				newState.skills = r.data
			}
			getStudentSkills(getCurrentStudentId())
			.then(r => {
				if (r.data) {
					newState.interests = r.data
				}
				console.log("SKILLS?", skills)
				console.log("INTERESTS?", interests)
				this.setState(newState);
				});
		});
	}

	// Handles data for page
	generalHandler() {
			let id = this.retrieveSlug();
			getStudentFromUser(id).then((resp) => {
				console.log("GETTING STUDENT", resp);
				var class_arr = [];
				if (resp.data && resp.data.classes) {
					resp.data.classes.split(',').map((name, index) => {
						class_arr.push({name, index});
					})
				}
        this.setState({
					user: {
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
						skills: [],
						interests: [],
        		student: true,
        		s_id: resp.data.id,
						work_experiences: [],
        	}
				}, () => {
					addWorkExperiencesToStudent([]).then(r => {
						if (r && r.data) {
							var newState = this.state;
							newState.user.work_experiences = r.data.work_experiences;
							this.setState(newState, () => {
								this.retrieveTags.bind(this);
							})
						}
					})
				});
			})
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

	render() {
		if (!isLoggedIn()) {
			return <ErrorPage />
		} else if (this.state.not_student) {
			return <ErrorPage fourofour="true" />
		} else {
	 	return (
	 		<div id='user-content-body'>
				<div id="greyBackdrop" className="modal-backdrop"></div>
				<EditModal id="skills-interests-edit" title="Edit Skills and Interests" modalAction={this.updateTags.bind(this)} noPadding={true}>
					<PickYourInterests editorOnly={true} user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal >
				<EditModal id="contact-edit" title="Edit Contact Info" modalAction={this.sendUpdate.bind(this)}>
					<EditContact  user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="link-edit" title="Edit Links" modalAction={this.sendUpdate.bind(this)}>
					<EditLinks  user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="academics-edit" title="Edit Academic Info" modalAction={this.sendUpdate.bind(this)}>
					<NotableClasses updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="work-edit" title="Edit Work Info" modalAction={this.updateExperience.bind(this)}>
					<EditExperience type="work" user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="education-edit" title="Edit Education Info" modalAction={this.sendUpdate.bind(this)}>
					<EditExperience type="educ" user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="bio-edit" title="Edit Bio" modalAction={this.sendUpdate.bind(this)}>
					<EditBio user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
				<EditModal id="quickview-edit" title="Edit Quickview Info" modalAction={this.sendUpdate.bind(this)}>
					<EditQuickview img='/img/headshots/bbear.jpg' user={this.state.user} updateUser={this.updateUser.bind(this)}/>
				</EditModal>
	 			<div id='user-column-L'>
	 				<div>
	 					<h1>Academics</h1>
	 					<div>
	 						<div><b>GPA</b> {this.state.user.gpa}</div>
							<div><b>Major</b> {this.state.user.major}</div>
	 						<div><b>Year</b> {this.state.user.year}</div>
	 						<StudentClasses list={this.state.user.classes}/>
	 					</div>
	 					<Editor superClick={() => this.openModal('academics-edit')}/>
	 				</div>
	 				<div>
	 					<h1>Contact</h1>
	 					<div>
	 						<div id='user-email'><b>Email</b> <a href={`mailto:${this.state.user.email}`}>{this.state.user.email}</a></div>
	 						<div id='user-phone'><b>Phone</b> {this.state.user.phone}</div>
	 					</div>
	 					<Editor superClick={() => this.openModal('contact-edit')}/>
	 				</div>
	 				<div id='user-links'>
	 					<h1>Links</h1>
	 					<div>
	 						<a target="_blank" href={this.state.user.linkedin_link} style={{textAlign: 'left', textDecoration: 'underline'}}>LinkedIn</a>
	 						<a target="_blank" href={this.state.user.resume_path} style={{textAlign: 'left', textDecoration: 'underline'}}>Resume</a>
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
	 						<img id='user-quickview-img' src={this.state.user.img ? this.state.user.img : '/img/headshots/bbear.jpg'}/>
	 					</div>
	 					<div style={{position: 'relative'}}>
		 					<img id='user-quickview-coverimage' src='https://d1w9csuen3k837.cloudfront.net/Pictures/1120xAny/0/8/1/135081_Index-and-hero---A-picture-is-worth-a-thousand-word.jpg' />
		 					<div id='user-quickview-footer'>
								{this.state.user.school}
							</div>
		 					<div id='user-quickview-name'>{this.state.user.name}</div>
	 					</div>
	 					<SkillsInterests skills={this.state.user.skills} interests={this.state.user.interests}/>
	 					<div style={{backgroundColor: 'white', position: 'absolute', top: '0', right: '0', width: '45px', height: '40px', borderRadius: '10px'}}><Editor superClick={() => this.openModal('quickview-edit')}/></div>
	 				</div>
	 				<div id='user-bio'>
	 					<h1>Bio</h1>
	 					<UserBio>{this.state.user.bio}</UserBio>
	 					<Editor superClick={() => this.openModal('bio-edit')}/>
	 				</div>
	 				<div>
	 					<h1>Experience</h1>
	 					<UserWorkExperience expObjs={this.state.user.work_experiences}/>
	 					<Editor superClick={() => this.openModal('work-edit')}/>
	 				</div>
	 				<div id='user-education'>
	 					<h1>Education</h1>
	 					<UserEducation expObj={this.state.user.experience}/>
	 					<Editor superClick={() => this.openModal('education-edit')}/>
	 				</div>
	 			</div>
			</div>

		);
	 }
	}
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
					{this.props.list.map((item, index) => <div key={index}>{item.name}</div>)}
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
			description: "",
		}
	}

	componentDidMount() {
		if (this.state.description.length >= 250)
			this.setState({showExpander: true})
	}

	expand() {
		document.getElementById(`user-work-description-${this.props.title}`).classList.toggle('expand')
	}

	render() {
		var expObjs = this.props.expObjs ? this.props.expObjs : [];
		return(expObjs.map((expObj, index) => {
			return(
				<div key={`user-work-${index}`}  id={`user-work-${expObj.title}`} className='user-work-experience'>
					<div className='user-work-title'>{expObj.title}</div>
					<div className='user-work-time'>
						{`${expObj.start_date} - ${expObj.end_date}`}
					</div>
					<div id={`user-work-description-${expObj.title}`} className='user-work-description'>{expObj.description}</div>
					{this.state.showExpander && <ExpanderIcons id={`user-work-${"title"}`} action={this.expand.bind(this)}/>}
				</div>
			)
		}))
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
				{this.props.interests.map((item, index) => <Bubble key={`${index}-int`} type='interest'>{item.name}</Bubble>)}
				{this.props.skills.map((item, index) => <Bubble  key={`${index}-skill`} type='skill'>{item.name}</Bubble>)}
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
