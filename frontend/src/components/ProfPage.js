import React, {Component} from 'react';
import BioTab from './BioTab';
import PositionsTab from './PositionsTab';
import Indicator from './Indicator';
import InterestsTab from './InterestsTab';
import SkillsTab from './SkillsTab';
import SquareButton from './SquareButton';
import './ProfPage.css';

class ProfPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			yes: ['spots open', 'undergrads', 'credit', 'first-timers'],
			no: ['paid', 'seniors', 'freshman'],
			lab_summary: "At the Infant Cognition Project, we look closely at how infants and preschool aged children think about and understand the world around them. Specifically, we are interested in infants and young children's understanding of the social world and behavior of other people.",
			slug: 'the-infant-cognition-project',
			positions: [ 
				{
					name: "Lab Assistant",
					skills: [
						"linguistic inquiry",
						"day reconstruction method",
						"patience with children",
					],
				},
			]
		};
	}

	handleUserTypeCheck(event) { // JUST FOR TESTING FRONT-END, TO BE DEPRECATED
		if (event.target.value === 'faculty') {
			this.setState({user_type: 'faculty'});
		}
		else {
			this.setState({user_type: 'student'});
		}
	}

	render() {
		var apply_dest = '/apply/' + this.state.slug;
		return(
			<div className='shift-down container'>
				<div className='row dark-blue-bg'>
					<img src='https://static1.squarespace.com/static/54693b1ee4b07c8a3da7b6d0/58df54aa1b10e31ed44dab4b/58df54ab6b8f5b410f59d285/1491031900534/Leap-Systems-2016-Headshots-By-Lamonte-G-Photography-IMG_1871-Edit.jpg' style={{height: '200px', width: '200px', float: 'left', marginRight: '10px'}}/>
					<div className='prof-page-name'>{this.state.lab_name}</div>
					<div className='indicator-container'>
						{this.state.yes.map((msg) => <Indicator key={msg} msg={msg} type='on'/>)}
					</div>
					<div className='indicator-container'>
						{this.state.no.map((msg) => <Indicator key={msg} msg={msg} type='off'/>)}
					</div>
				</div>
				<div className="row center-align">  {/* JUST FOR FRONT-END TESTING, TO BE DEPRECATED */}
					<p className="fe-test">View As:</p>
					<input className="radio" name="user_type" type="radio" id="faculty" value="faculty" onChange={this.handleUserTypeCheck.bind(this)} required />
					<label htmlFor="faculty">Faculty</label>
					<input className="radio" name="user_type" type="radio" id="student" value="student" onChange={this.handleUserTypeCheck.bind(this)} required />
					<label htmlFor="student">Student</label>
				</div>
				<div className='row flex ddd-bg'>
					<PositionsTab header='open positions' positions={this.state.positions} user_type={this.state.user_type} apply_dest={apply_dest} />
				</div>
				<div className='row flex ddd-bg'>
					<BioTab header='what we do' msg={this.state.lab_summary}/>
				</div>
				<div className='row flex'>
					<div className='profile-tab shadow'><InterestsTab tabTitle="LABELS" user_type="faculty" /></div>
					<div className='profile-tab shadow'><SkillsTab user_type="faculty" /></div>
				</div>
				{/*<div className='left-align row flex'>
					<div className='col s3'>
						<img src='img/benji.jpg' style={{border: '1px solid white', height: '200px', width: '200px'}}/>
					</div>
					<div className='col s6' style={{backgroundColor: '#ddd'}}>
						<BioTab />
					</div>
					<div className='col s3' style={{backgroundColor: '#ddd'}}>
						<AcademicsTab />
					</div>
				</div>
				<div className='row flex'>
					<div className='col s6 profile-tab shadow'><InterestsTab /></div>
					<div className='col s6 profile-tab shadow'><SkillsTab /></div>
				</div>
				<div className='row flex'>
					<div className='col s12 profile-tab shadow'><PastResearchTab /></div>
				</div>*/}
			</div>
		);
	}
}

export default ProfPage;