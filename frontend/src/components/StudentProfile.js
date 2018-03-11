import React, {Component} from 'react';
import SquareButton from './SquareButton';
import SkillsTab from './SkillsTab';
import InterestsTab from './InterestsTab';
import BioTab from './BioTab';
import AcademicsTab from './AcademicsTab';
import PastResearchTab from './PastResearchTab';
import Endorsements from './Endorsements'
import {getStudent} from '../helper.js'
import $ from 'jquery'
import './StudentProfile.css';
class StudentProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			s: {},
			name: 'Meha Patel',
			major: 'Computer Science',
			year: 'Junior',
			bio: "I'm a junior at the University of Michigan studying Computer Science with interests in Computer Security, Software Development, and Machine Learning. ",
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
			]
		}
	}

	componentDidMount() {
		$( document ).ready(()=> {
			var s_img = document.getElementById('student-img');
			var height = window.getComputedStyle(s_img, null).height;
    		var overlay = document.getElementById('overlay');
			var s_name = document.getElementById('student-name');
			
			s_name.style.height = height;
			overlay.style.height = height;
			overlay.style.width = height;

			this.setState();
		});

		getStudent(1).then((resp) => {
            this.setState(
            	{
            		s: resp,
            	}
            );
            console.log(this.state.s);
        });
		
	}

	render() {
		return (
			<div className='container shift-down'>
				<div className='row left-align'>
					<div className='tab-container' style={{position: 'relative'}}>
						<img id='student-img' className='col s6 m4 l3' src={this.state.img_src} />

						<div id='overlay' className='student-img-overlay'>
		                    <div className='student-img-overlay-text'>
		                        <a href='/update-image?user_type=student' id="editImageText" className="null-link-style" >
									<i className="material-icons interest-editor edit-icon" id="imageEdit">create</i>
								</a>
		                    </div>
		                </div>
	                </div>

					<div id='student-name' className='col s6 m8 l9 valign-wrapper student-name'>
						<div className='container center-align flow-text'>{`${this.state.s.first_name} ${this.state.s.last_name}`}</div>
						<a href='/prof-page'><div className='student-current-lab'>{this.state.curr_lab}</div></a>
					</div>
				</div>
				<div className=''>

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
				</div>
			</div>
			
		);
	}
}

export default StudentProfile;