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
					<div className='col s3'>
						<img src='img/benji.jpg' style={{border: '1px solid white', height: '200px', width: '200px'}}/>
					</div>
					<div className='col s6' style={{backgroundColor: '#ddd'}}>
						<BioTab />
					</div>
					<div className='col s3' style={{backgroundColor: '#ddd'}}>
						<AcademicsTab />
					</div>
					{/*<div  style={{fontSize: '40px', color: 'white', letterSpacing: '2px'}}>Benji Bear</div>*/}
				</div>
				<div className='row flex'>
					<div className='col s6 profile-tab shadow'><InterestsTab /></div>
					<div className='col s6 profile-tab shadow'><SkillsTab /></div>
				</div>
				<div className='row flex'>
					<div className='col s12 profile-tab shadow'><PastResearchTab /></div>
				</div>
			</div>
			
		);
	}
}

export default StudentProfile;