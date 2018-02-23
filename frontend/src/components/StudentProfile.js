import React, {Component} from 'react';
import SquareButton from './SquareButton';
import SkillsTab from './SkillsTab';
import InterestsTab from './InterestsTab';
import BioTab from './BioTab';
import AcademicsTab from './AcademicsTab';
import PastResearchTab from './PastResearchTab';
import $ from 'jquery'
import './StudentProfile.css';
class StudentProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			major: 'Computer Science',
			year: 'Junior',
			bio: "I'm a junior at the University of Michigan studying Computer Science with interests in Computer Security, Software Development, and Machine Learning.",
			GPA: '3.90',
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
		}
	}

	componentDidMount() {
		$( document ).ready(()=> {
    		var s_img = document.getElementById('student-img');
			var height = window.getComputedStyle(s_img, null).height;
			var a_tab = document.getElementById('academics-tab');
			var s_name = document.getElementById('student-name');
			a_tab.style.height = height;
			s_name.style.height = height;
		});
		
	}

	render() {
		return (
			<div className='container shift-down'>
				<div className='row left-align'>
					<div className='hide-on-med-and-up col s12 valign-wrapper' style={{padding: '0px'}}>
						<div className='container center-align flow-text student-name-mobile'>Benji Bear</div>
					</div>
					<img id='student-img' className='col s6 m4 l3' src='img/meha.jpg' />
					<div id='academics-tab' className='col s6 m3 l3' style={{backgroundColor: '#ddd', display: 'inline-block' }}>
						<AcademicsTab classes={this.state.classes} major={this.state.major} year={this.state.year} GPA={this.state.GPA}/>
					</div>	
					<div id='student-name' className='hide-on-small-only col s12 m5 l6 valign-wrapper student-name'>
						<div className='container center-align flow-text'>Benji Bear</div>
					</div>
					
				</div>
				<div className=''>
					<div className='row' style={{backgroundColor: '#ddd'}} >
						<BioTab header='bio' msg={this.state.bio}/>
					</div>	

					<div className='row flex'>
						<div className='profile-tab shadow' style={{width: '50%'}}><InterestsTab tabTitle="INTERESTS" user_type="student" interests={this.state.interests} /></div>
						<div className='profile-tab shadow' style={{width: '50%'}}><SkillsTab user_type="student" skills={this.state.skills}/></div>
					</div>
					<div className='row flex'>
						<div className='profile-tab shadow' style={{width: '100%'}}><PastResearchTab /></div>
					</div>
				</div>
			</div>
			
		);
	}
}

export default StudentProfile;