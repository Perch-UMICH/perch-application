import React, {Component} from 'react';
import BioTab from './BioTab';
import PositionsTab from './PositionsTab';
import Indicator from './Indicator';
import InterestsTab from './InterestsTab';
import SkillsTab from './SkillsTab';
import ContactTab from './ContactTab'
import {getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser} from '../helper.js'
import ErrorPage from './ErrorPage'
import './ProfPage.css'

class ProfPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "",
			yes: ['spots open', 'undergrads', 'credit', 'first-timers'],
			no: ['paid', 'seniors', 'freshman'],
			img_src: 'https://static1.squarespace.com/static/54693b1ee4b07c8a3da7b6d0/58df54aa1b10e31ed44dab4b/58df54ab6b8f5b410f59d285/1491031900534/Leap-Systems-2016-Headshots-By-Lamonte-G-Photography-IMG_1871-Edit.jpg',
			lab_summary: "At the Infant Cognition Project, we look closely at how infants and preschool aged children think about and understand the world around them. Specifically, we are interested in infants and young children's understanding of the social world and behavior of other people.",
			labels: [
				"Pediatry",
				"Children",
				"Medicine",
				"Psychology",
				"Cognition",
				"Bio-Informatics",
			], 
			skills: [
				"Pediatry",
				"Children",
				"Medicine",
				"Psychology",
				"Statistical Informatics",
			], 
			slug: 'the-infant-cognition-project',
			positions: [ 
				{
					name: "Lab Assistant",
					skills: [
						"linguistic inquiry",
						"drm",
						"patience with children",
					],
					num_applicants: 4,
				},
				{
					name: "Coffee Runner",
					skills: [
						"speed",
						"patience",
						"handling of hot substances",
					],
					num_applicants: 2,
				},
			],
			contact_info: [
				{label: 'phone', value: '815-262-6642'},
				{label: 'email', value: 'bearb@umich.edu'},
				{label: 'location', value: 'Central Campus'},
			],
			user_id: getCurrentUserId(),
		};
	}

	componentDidMount() {
		if (isLoggedIn()) {
			// check if student or faculty for viewing positions
			getUser(this.state.user_id).then(resp => {
				console.log("Merp");
				console.log(resp);
				if (resp.result.is_student) {
					this.setState({user_type: "student"});
				} else {
					this.setState({user_type: "faculty"});
				}
			});
			//getFacultyFromUser(this.state.user_id)
			getLab(window.location.pathname.split('/')[2]).then((resp) => {
	            this.setState(
	            	{
	            		lab_name: resp.data.name,
	            		contact_info: [
	            			{label: 'location', value: resp.data.location}
	            		],
	            		lab_summary: resp.data.description,
	            		labels: resp.tags,
	            		skills: resp.skills,
	            	}
	            );
	        });
		}
	}

	render() {
		var apply_dest = '/apply/' + this.state.slug;
		if (true) {
		//if (isLoggedIn()) {
			return(
				<div className='shift-down container'>
					<div className='row dark-blue-bg'>
						<img src={this.state.img_src} style={{height: '200px', width: '200px', float: 'left', marginRight: '10px'}} alt=''/>
						<div className='prof-page-name'>{this.state.lab_name}</div>
						<a href='/update-lab-specifications'><i className="material-icons interest-editor" id="specEdit">create</i></a>
						<div className='indicator-container'>
							{this.state.yes.map((msg) => <Indicator key={msg} msg={msg} type='on'/>)}
						</div>
						<div className='indicator-container'>
							{this.state.no.map((msg) => <Indicator key={msg} msg={msg} type='off'/>)}
						</div>
					</div>
					<div className='row flex ddd-bg'>
						<PositionsTab header='open positions' positions={this.state.positions} user_type={this.state.user_type} apply_dest={apply_dest} />
					</div>
					<div className='row flex ddd-bg'>
						<BioTab header='what we do' user_type='faculty' msg={this.state.lab_summary}/>
						<div className='hide-on-small-only' style={{width: '30%'}}><ContactTab header='contact' contact_info={this.state.contact_info} /></div>
					</div>
					<div className='row flex'>
						<div className='profile-tab shadow' style={{width: '50%'}}><InterestsTab tabTitle="LABELS" user_type="faculty" interests={this.state.labels}/></div>
						<div className='profile-tab shadow' style={{width: '50%'}}><SkillsTab user_type="faculty" skills={this.state.skills}/></div>
					</div>
					<div className='row ddd-bg hide-on-med-and-up'>
						<div className='profile-tab'><ContactTab header='contact info' contact_info={this.state.contact_info} /></div>
					</div>
				</div>
			);
		}
		else {
			return <ErrorPage />
		}
	}
}

export default ProfPage;