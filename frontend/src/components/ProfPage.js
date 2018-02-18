import React, {Component} from 'react';
import BioTab from './BioTab'
import Indicator from './Indicator'
import './ProfPage.css'

class ProfPage extends Component {
	constructor(props) {
		super(props);

	}

	render() {

		return(
			<div className='shift-down container'>
				<div className='row flex ddd-bg'>
					<BioTab header='what we do' msg="We are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. We are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. We are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. e are a lab that does cool shit. "/>
				</div>
				<div className='row flex'>
					
					<Indicator msg='yes spots open' type='on'/>
					<Indicator msg='yes for credit' type='on'/>
					<Indicator msg='not paid' type='off'/>
					{/*<Indicator msg='yes undergrads' type='on'/>
					<Indicator msg='no undergrads' type='off'/>
					<Indicator msg='no freshman' type='off'/>*/}
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