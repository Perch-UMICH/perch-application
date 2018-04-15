import React, {Component} from 'react';
import BioTab from './BioTab';
import PositionsTab from './PositionsTab';
import Indicator from './Indicator';
import InterestsTab from './InterestsTab';
import SkillsTab from './SkillsTab';
import ContactTab from './ContactTab'
import AcceptRate from './AcceptRate'
import {permissionCheck, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, getLabPositions, getLabPreferences, isStudent, isLab} from '../helper.js'
import ErrorPage from './ErrorPage'
import ExtLinkBox from './ExtLinkBox'
import './ProfPage.css'

class ProfPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lab_name: "",
			yes: ['spots open', 'undergrads', 'credit'],
			no: ['paid', 'seniors', 'freshmen'],
			img_src: 'https://static1.squarespace.com/static/54693b1ee4b07c8a3da7b6d0/58df54aa1b10e31ed44dab4b/58df54ab6b8f5b410f59d285/1491031900534/Leap-Systems-2016-Headshots-By-Lamonte-G-Photography-IMG_1871-Edit.jpg',
			labels: [], 
			skills: [], 
			positions: [],
			contact_info: [],
			user_id: getCurrentUserId(),
			no_lab: false,
			dest: '/edit-external-links',
		};
	}

	componentDidMount() {
		console.log(getCurrentUserId());
		if (isLoggedIn()) {
			// check if student or faculty for viewing positions
			if (isStudent())
				this.setState({user_type: "student"});
			else if (isLab())
				this.setState({user_type: "faculty"});
	
			var lab_id = window.location.pathname.split('/')[2];
			getLab(lab_id).then((resp) => {
				console.log(resp);
				if (resp.data) {
					getAllLabPositions(lab_id).then(positions => {
						console.log(positions);
						this.setState({ positions: positions });
					});
					getLabPreferences(lab_id).then(prefs => {
						console.log(prefs);
						var no_arr = [];
						var yes_arr = [];
						if (prefs) {
							for (var i = 0; i < prefs.length; ++i) {
								if (prefs[i].type === "No") {
									no_arr.push(prefs[i]);
								} else {
									yes_arr.push(prefs[i]);
								}
							}
						}
						// this.setState({ yes: yes_arr, no: no_arr });
					});
					var contact_info = [];
					if (resp.data.location) {
						contact_info.push({label: 'location', value: resp.data.location});
					} 
					if (resp.data.contact_email) {
						contact_info.push({label: 'email', value: resp.data.contact_email});
					}
					this.setState(
						{
							lab_name: resp.data.name,
							contact_info: contact_info,
							lab_summary: resp.data.description,
							labels: resp.tags,
							skills: resp.skills,
							//img_src: resp.data.labpic_path, ADD BACK IN TO SHOW IMAGE ONCE ON SAME SERVER!
						}
					);
				} else {
					this.setState({ no_lab: true });
				}
	        });
		}
	}

	render() {
		var apply_dest = '/apply/' + window.location.pathname.split('/')[2];
		if (!isLoggedIn()) {
			return <ErrorPage /> 
		} else if (this.state.no_lab) {
			return <ErrorPage fourofour="true" />
		} else {
			return(
				<div className='content-body'>
					<div className='shadow' id='left-column'>
						<ContactTab header='contact' contact_info={this.state.contact_info} />
						<AcceptRate rate={5} />
						<div className='ext-links mobile-header tab academic-tab-header'>Links
							<a href='#' className="null-link-style" >
							{ permissionCheck() && 
								<a href={this.state.dest}><i className="material-icons interest-editor edit-icon" style={{position: 'absolute', right: '0'}} >create</i></a>
							}
							</a>
						</div>
						<ExtLinkBox dest={this.state.website}>Website</ExtLinkBox>
					</div>
					<div id='right-column' className='shadow center-align'>
		 				<div className='ad'>AD</div>
		 				<div className='ad'>AD</div>
		 				<div className='ad'>AD</div>
		 			</div>
		 			<div className='container shift-down' id='center-column'>
		 				<div id='student-main-card' className='left-align shadow'>
							<img id='student-image' src={this.state.img_src} alt='' />
							<div id='bio-card'>
								<div id='bio-header' className='flow-text'><b>{this.state.lab_name}</b></div>
								<div className='indicator-container'>
									{this.state.yes.map((msg) => <Indicator key={msg} msg={msg} type='on'/>)}
								</div>
								<div className='indicator-container'>
									{this.state.no.map((msg) => <Indicator key={msg} msg={msg} type='off'/>)}
								</div>
							</div>

							<div style={{backgroundColor: '#ddd', marginTop: '10px'}}>
								<BioTab header='what we do' user_type='faculty' msg={this.state.lab_summary}/>
							</div>

							<div style={{backgroundColor: '#ddd'}}>
								<PositionsTab header='open positions' positions={this.state.positions} user_type={this.state.user_type} apply_dest={apply_dest} />
							</div>

							<div id='tag-boxes' className='flex'>
								<div className='profile-tab shadow'><InterestsTab tabTitle="LABELS" user_type="faculty" interests={this.state.labels}/></div>
								<div className='profile-tab shadow'><SkillsTab user_type="faculty" skills={this.state.skills}/></div>
							</div>
						</div>
		 			</div>
				</div>
			)
			// return(
			// 	<div className='shift-down container'>
			// 		<div className='row dark-blue-bg'>
			// 			<img src={this.state.img_src} style={{height: '200px', width: '200px', float: 'left', marginRight: '10px'}} alt=''/>
			// 			<div className='prof-page-name'>{this.state.lab_name}</div>
			// 			<a href='/update-lab-specifications'><i className="material-icons interest-editor" id="specEdit">create</i></a>
			// 			<div className='indicator-container'>
			// 				{this.state.yes.map((msg) => <Indicator key={msg} msg={msg} type='on'/>)}
			// 			</div>
			// 			<div className='indicator-container'>
			// 				{this.state.no.map((msg) => <Indicator key={msg} msg={msg} type='off'/>)}
			// 			</div>
			// 		</div>

			// 		<div className='row flex ddd-bg'>
			// 			<PositionsTab header='open positions' positions={this.state.positions} user_type={this.state.user_type} apply_dest={apply_dest} />
			// 		</div>
			// 		<div className='row flex ddd-bg'>
			// 			<BioTab header='what we do' user_type='faculty' msg={this.state.lab_summary}/>
			// 			<div className='hide-on-small-only' style={{width: '30%'}}><ContactTab header='contact' contact_info={this.state.contact_info} /></div>
			// 		</div>
			// 		<div className='row flex'>
			// 			<div className='profile-tab shadow' style={{width: '50%'}}><InterestsTab tabTitle="LABELS" user_type="faculty" interests={this.state.labels}/></div>
			// 			<div className='profile-tab shadow' style={{width: '50%'}}><SkillsTab user_type="faculty" skills={this.state.skills}/></div>
			// 		</div>
			// 		<div className='row ddd-bg hide-on-med-and-up'>
			// 			<div className='profile-tab'><ContactTab header='contact info' contact_info={this.state.contact_info} /></div>
			// 		</div>
			// 	</div>
			// );
		}
	}
}

export default ProfPage;