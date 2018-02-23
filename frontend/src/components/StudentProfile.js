import React, {Component} from 'react';
import SquareButton from './SquareButton';
import SkillsTab from './SkillsTab';
import InterestsTab from './InterestsTab';
import BioTab from './BioTab';
import AcademicsTab from './AcademicsTab';
import PastResearchTab from './PastResearchTab';
import './StudentProfile.css';
class StudentProfile extends Component {

	componentDidMount() {
		// var elem = document.querySelector('.grid');
		// var msnry = new Masonry( elem, {
		//   // options
		//   itemSelector: '.grid-item',
		//   columnWidth: 200
		// });

		// // element argument can be a selector string
		// //   for an individual element
		// var msnry = new Masonry( '.grid', {
		//   // options
		// });
	}
	render() {
		return (
			<div className='shift-down container'>
				<div className='left-align row flex'>
					<div className='' style={{width: '25%'}}>
						<img src='/img/benji.jpg' style={{border: '1px solid white', height: '200px', width: '200px'}}/>
					</div>
					<div className='shadow' style={{backgroundColor: '#ddd', width: '50%'}}>
						<BioTab header='bio' msg="I'm a junior at the University of Michigan studying Computer Science with interests in Computer Security, Software Development, and Machine Learning."/>
					</div>
					<div className='shadow' style={{backgroundColor: '#ddd', width: '25%'}}>
						<AcademicsTab />
					</div>
					{/*<div  style={{fontSize: '40px', color: 'white', letterSpacing: '2px'}}>Benji Bear</div>*/}
				</div>
				<div className='row flex'>
					<div className='profile-tab shadow' style={{width: '50%'}}><InterestsTab tabTitle="INTERESTS" user_type="student" /></div>
					<div className='profile-tab shadow' style={{width: '50%'}}><SkillsTab user_type="student" /></div>
				</div>
				<div className='row flex'>
					<div className='profile-tab shadow' style={{width: '100%'}}><PastResearchTab /></div>
				</div>
			</div>
			
		);
	}
}

export default StudentProfile;