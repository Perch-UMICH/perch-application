import React, {Component} from 'react';
import SquareButton from './SquareButton';
import SkillsTab from './SkillsTab';
import InterestsTab from './InterestsTab';
import BioTab from './BioTab';
import AcademicsTab from './AcademicsTab';
import PastResearchTab from './PastResearchTab';
import Endorsements from './Endorsements'
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin} from '../helper.js'
import ErrorPage from './ErrorPage'
import $ from 'jquery'
import './StudentProfile.css';

var FontAwesome = require('react-fontawesome');

class StudentProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			major: '',
			year: '',
			bio: "",
			GPA: '3.90',
			img_src: '/img/meha.jpg',
			curr_lab: 'The Infant Cognition Project',
			skills: [
				"plating",
				"chromatography",
				"R",
				"C++",
				"MatLab",
				"Javascript",
				"React.js",
				"Node.js",
				"Meteor.js",
				"Kali Linux",
				"Pen Testing",
			],
			interests: [
				"Computer Security",
				"Machine Learning",
				"Software Development",
				"Medicine",
				"Pen Testing",
				"Web Development",
			],
			classes: [
				"EECS 281",
				"EECS 370",
				"EECS 380",
			],
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

	componentDidMount() {
		// $( document ).ready(()=> {
		// 	var s_img = document.getElementById('student-img');
		// 	var height = window.getComputedStyle(s_img, null).height;
  //   		var overlay = document.getElementById('overlay');
		// 	var s_name = document.getElementById('student-name');
			
		// 	s_name.style.height = height;
		// 	overlay.style.height = height;
		// 	overlay.style.width = height;

		// 	this.setState();
		// });

		if (isLoggedIn()) {
			let id = window.location.pathname.split( '/' )[2];
			getStudent(id).then((resp) => {
				console.log(resp);
	            this.setState(
	            	{
	            		name: `${resp.data.first_name} ${resp.data.last_name}`,
	            		GPA: resp.data.gpa,
	            		major: resp.data.major,
	            		year: resp.data.year,
	            		bio: resp.data.bio,
	            		interests: resp.tags,
	            		skills: resp.skills,
	            		email: resp.data.email,
	            	}
	            );
	            
	        });
		}
		
	}

	render() {
		if (true) {
	 	return (
			<div className='container shift-down'>
				<div>
					<div className='' style={{height: '230px', width: '900px', margin: '20px auto', marginBottom: '0', backgroundColor: 'white', position: 'relative', border: '1px solid #ddd', borderBottom: 'none'}}>
						<img src={this.state.img_src} style={{width: '230px'}} />
						<div style={{position: 'absolute', top: '30px', left: '250px', color: 'grey', letterSpacing: '0px'}}>
							<div className='flow-text'>I'm <b>{this.state.name}</b></div>
							<div>Interested in Fluid Dynamics</div>
							<hr />
							<div>GPA: {this.state.GPA}</div>
							<div>{this.state.major} major</div>
							<div>{this.state.year}</div>
							<div>{this.state.email}</div>
						</div>
					</div>
					<div className='center-align' style={{height: '50px', backgroundColor: 'rgb(41, 182, 246)', width: '900px', margin: 'auto auto', marginBottom: '20px', lineHeight: '50px', border: '1px solid #ddd', borderTop: 'none'}}>
						
						<i class="far fa-address-book"></i>
						<i class="material-icons">add</i>
						<FontAwesome name='rocket' />
					</div>
				</div>
				{/*<div className='row left-align'>
					<div className='tab-container' style={{position: 'relative'}}>
						<img id='student-img' className='col s6 m4 l3' src={this.state.img_src} />

						<div id='overlay' className='student-img-overlay'>
		                    <div className='student-img-overlay-text'>
		                        <a href='/update-image?user_type=student' id="editImageText" className="null-link-style" >
									{isLoggedIn() && 
										<i className="material-icons interest-editor edit-icon" id="imageEdit">create</i>
									}
								</a>
		                    </div>
		                </div>
	                </div>

					<div id='student-name' className='col s6 m8 l9 valign-wrapper student-name'>
						<div className='container center-align flow-text'>{this.state.name}</div>
						<a href='/prof-page'><div className='student-current-lab'>{this.state.curr_lab}</div></a>
					</div>
				</div>*/}
				{<div className=''>

					{this.state.endorsements.length > 0 &&
						<div>
							<div className='row hide-on-small-only' style={{backgroundColor: '#ddd'}} > 
								<div style={{display: 'flex'}}>
									<div style={{display: 'flex', width: '70%'}}><BioTab header='bio' user_type='student' msg={this.state.bio}/></div>
									<div className='light-blue-background white-text-now' style={{display: 'flex', width: '30%'}}><Endorsements header={'Endorsements'} endorsements={this.state.endorsements} /></div>	
								</div>
							</div>

							<div className='row hide-on-med-and-up' style={{backgroundColor: '#ddd'}} > 
								<BioTab header='bio' user_type='student' msg={this.state.bio}/>
							</div>	
							<div className='row hide-on-med-and-up' style={{backgroundColor: '#ddd', color: 'grey'}} > 
								<Endorsements header={'Endorsements'} endorsements={this.state.endorsements} />
							</div>	

						</div>
					}

					{!this.state.endorsements.length &&
						<div className='row flex' style={{backgroundColor: '#ddd'}} > 
							<BioTab header='bio' user_type='student' msg={this.state.bio}/>
						</div>	
					}

					<div className='row flex'>
						<div className='profile-tab shadow' style={{width: '50%'}}><InterestsTab tabTitle="INTERESTS" user_type="student" interests={this.state.interests} /></div>
						<div className='profile-tab shadow' style={{width: '50%'}}><SkillsTab user_type="student" skills={this.state.skills}/></div>
					</div>
					<div className='row flex'>
						<div className='profile-tab shadow' style={{width: '50%'}}><AcademicsTab classes={this.state.classes} major={this.state.major} year={this.state.year} GPA={this.state.GPA}/></div>
						<div className='profile-tab shadow' style={{width: '50%'}}><PastResearchTab /></div>
					</div>
				</div>}
			</div>
			
		);
	 }
	 else {
	 	return <ErrorPage />
	 }
	}
}

export default StudentProfile;