import React, {Component} from 'react';
import BioTab from './BioTab'
import Indicator from './Indicator'
import InterestsTab from './InterestsTab'
import SkillsTab from './SkillsTab'
import './ProfPage.css'

class ProfPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			yes: ['spots open', 'undergrads', 'credit', 'first-timers'],
			no: ['paid', 'seniors', 'freshman'],
			lab_summary: "We are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. We are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. We are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. " 
		}
	}

	render() {

		return(
			<div className='shift-down container'>
				<div className='row dark-blue-bg'>
					<img src='img/benji.jpg' style={{height: '200px', width: '200px', float: 'left', marginRight: '10px'}}/>
					<div className='prof-page-name'>Benji Bear's Neurosurgery Lab</div>
					<div className='indicator-container'>
						{this.state.yes.map((msg) => <Indicator msg={msg} type='on'/>)}
					</div>
					<div className='indicator-container'>
						{this.state.no.map((msg) => <Indicator msg={msg} type='off'/>)}
					</div>
				</div>
				<div className='row flex ddd-bg'>
					<BioTab header='what we do' msg={this.state.lab_summary}/>
				</div>
				<div className='row flex'>
					<div className='profile-tab shadow'><InterestsTab tabTitle="LABELS" /></div>
					<div className='profile-tab shadow'><SkillsTab /></div>
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