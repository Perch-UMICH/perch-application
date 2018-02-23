import React, {Component} from 'react';
import BioTab from './BioTab'
import Indicator from './Indicator'
import InterestsTab from './InterestsTab'
import SkillsTab from './SkillsTab'
import HugeButton from './HugeButton'
import './ProfPage.css'

class ProfPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "The Infant Cognition Project",
			yes: ['spots open', 'undergrads', 'credit', 'first-timers'],
			no: ['paid', 'seniors', 'freshman'],
			lab_summary: "At the Infant Cognition Project, we look closely at how infants and preschool aged children think about and understand the world around them. Specifically, we are interested in infants and young children's understanding of the social world and behavior of other people." 
		}
	}

	render() {

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
				<div className='row flex ddd-bg'>
					<BioTab header='what we do' msg={this.state.lab_summary}/>
				</div>
				<div className='row flex'>
					<div className='profile-tab shadow'><InterestsTab tabTitle="LABELS" user_type="faculty" /></div>
					<div className='profile-tab shadow'><SkillsTab user_type="faculty" /></div>
				</div>
				<div className='row'><HugeButton msg='apply' /></div>
			</div>
		);
	}
}

export default ProfPage;