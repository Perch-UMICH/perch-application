import React, {Component} from 'react';
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin, getStudentFromUser, getStudentTags, getStudentSkills, getUser, updateStudent} from '../../../helper.js'
import ErrorPage from '../../utilities/ErrorPage'
import ExpanderIcons from '../../utilities/ExpanderIcons'
import Editor from '../../utilities/Editor'
import EditModal from '../../utilities/modals/EditModal'
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
				var class_arr = [];
				if (resp.result.classes) {
					class_arr = resp.result.classes.split('|');
				}
	            this.setState(
	            	{
	            		name: `${resp.result.first_name} ${resp.result.last_name}`,
	            		gpa: resp.result.gpa,
	            		major: resp.result.major,
	            		year: resp.result.year,
	            		bio: resp.result.bio,
	            		email: resp.result.email,
	            		classes: class_arr,
	            		past_research: resp.result.past_research,
	            		student: true,
	            		s_id: resp.result.id,
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
					this.generalHandler();
				} else {
					this.setState({ not_student: true });
				}
			} else {
				this.setState({ not_student: true });
			}
		});
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
		if (!isLoggedIn()) {
			return <ErrorPage />
		} else if (this.state.not_student) {
			return <ErrorPage fourofour="true" />
		} else {
	 	return (
	 		<div id='user-content-body'>
				<div id="greyBackdrop" className="modal-backdrop"></div>
				<EditModal id="contact-edit" title="Edit Contact Info">
					<div> Edit Contact Info Component Here! </div>
				</EditModal>
				<EditModal id="link-edit" title="Edit Links">
					<div> Edit Links Component Here! </div>
				</EditModal>
				<EditModal id="academics-edit" title="Edit Academic Info">
					<div> Edit Academic Info Component Here! </div>
				</EditModal>
				<EditModal id="work-edit" title="Edit Work Info">
					<div> Edit Work Info Component Here! </div>
				</EditModal>
				<EditModal id="education-edit" title="Edit Education Info">
					<div> Edit Education Info Component Here! </div>
				</EditModal>
	 			<div id='user-column-L'>
	 				<div>
	 					<h1><i className='em em-brain'/></h1>
	 					<div>
	 						<div><b>GPA</b> 3.99</div>
	 						<div><b>Year</b> Senior</div>
	 						<StudentClasses list={["EECS 281", "EECS 388", "EECS 376", "EECS 370"]}/>
	 					</div>
	 					<Editor superClick={() => this.openModal('academics-edit')}/>
	 				</div>
	 				<div>
	 					<h1><i class="em em-telephone_receiver"></i></h1>
	 					<div>
	 						<div id='user-email'><b>Email</b> <a href={`mailto:${'bearb@umich.edu'}`}>bearb@umich.edu</a></div>
	 						<div><b>Phone</b> 815 262 6642</div>
	 					</div>
	 					<Editor superClick={() => this.openModal('contact-edit')}/>
	 				</div>
	 				<div id='user-links'>
	 					<h1><i className='em em-link'/></h1>
	 					<div>
	 						<a>LinkedIn</a>
	 						<a>Resume</a>
	 					</div>
	 					<Editor superClick={() => this.openModal('link-edit')}/>
	 				</div>
	 			</div>
	 			<div id='user-column-R'>
	 				<div className='ad'></div>
	 				<div className='ad'></div>
	 				<div className='ad'></div>
	 			</div>
	 			<div id='user-profile-column-C'>
	 				<div id='user-quickview'>
	 					<img id='user-quickview-img' src='/img/headshots/bbear.jpg'/>
	 					<img id='user-quickview-coverimage' src='https://d1w9csuen3k837.cloudfront.net/Pictures/1120xAny/0/8/1/135081_Index-and-hero---A-picture-is-worth-a-thousand-word.jpg' />
	 					<div id='user-quickview-footer'>University of Michigan</div>
	 					<div id='user-quickview-name'></div>
	 				</div>
	 				<div>
	 					<h1>Work Experience</h1>
	 					<UserWorkExperience title="Dr. Patel's Neurosurgery Lab" description="Did some pretty cool stuff, including but not limited to: sleeping in the acetone bath, juggling vials, playing russian hydrochloric acid roulette, spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room." startTime='August 2017' endTime='Present'/>
	 					<UserWorkExperience title="Dr. Ramaswamy's Pharmaceutical Lab" description="Did some pretty cool stuff, including but not limited to: sleeping in the acetone bath, juggling vials, playing russian hydrochloric acid roulette, spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room." startTime='June 2015' endTime='September 2016'/>
	 					<Editor superClick={() => this.openModal('work-edit')}/>
	 				</div>
	 				<div id='user-education'>
	 					<h1>Education</h1>
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
					{this.props.list.map(item => <div>{item}</div>)}
				</div>
			</div>
		)
	}
}

class UserWorkExperience extends Component {
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
				<ExpanderIcons id={`user-work-${this.props.title}`} action={this.expand.bind(this)}/>
			</div>
		)
	}
}


export default StudentProfile;
