import React, {Component} from 'react';
import SquareButton from './SquareButton';
import SkillsTab from './SkillsTab';
import InterestsTab from './InterestsTab';
import BioTab from './BioTab';
import AcademicsTab from './AcademicsTab';
import PastResearchTab from './PastResearchTab';
import './StudentProfile.css';
class StudentProfile extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='shift-down'>
				<div className='row center-align'>
					<img src='img/benji.jpg' style={{height: '200px', width: '200px', marginRight: '5px'}}/>
					
					<div className='shadow' style={{backgroundColor: '#ddd', width: '200px', display: 'inline-block'}}>
						<AcademicsTab />
					</div>	
				</div>
				<div className='container'>
					<div className='row' style={{backgroundColor: '#ddd'}} >
						<BioTab header='bio' msg="I'm a junior at the University of Michigan studying Computer Science with interests in Computer Security, Software Development, and Machine Learning."/>
					</div>	

					<div className='row flex'>
						<div className='profile-tab shadow' style={{width: '50%'}}><InterestsTab tabTitle="INTERESTS" user_type="student" /></div>
						<div className='profile-tab shadow' style={{width: '50%'}}><SkillsTab user_type="student" /></div>
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