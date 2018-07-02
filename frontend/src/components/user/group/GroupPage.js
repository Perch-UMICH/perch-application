import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import GroupQuickview from './GroupQuickview'
import {GroupPublicationsContainer, GroupPublication} from './GroupPublications'
import {GroupProject, GroupProjectContainer} from './GroupProject'
import {permissionCheck, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, getLabPositions, getLabPreferences, isStudent, isLab} from '../../../helper.js'
import './GroupPage.css'

// Our Group Page master componenet
class GroupPage extends Component {
	render() {
		return(
			<div id='group-page'>
				<div id='group-page-column-L'>
					<Administrators />
					<Members />
				</div>
				<div id='group-page-column-R'>Right Column</div>
				<div id='group-page-main'>
					<GroupQuickview />
					<GroupProjectContainer>
						<GroupProject title='Data Analyst' spots='1' keywords='paid, computer science, machine learning' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.And we need hands on the job. And we need hands on the job.And we need hands on the job. And we need hands on the job.' urop/>
						<GroupProject title='Coffee Runner' spots='2' keywords='for-credit, chemistry, physics' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.'/>
					</GroupProjectContainer>

					<GroupPublicationsContainer>
						<GroupPublication title='Plasmid Pulverization in Perniscuous Polyfills' description="Plasmids pulverize these polyfills like its no one's business. When they pounce, energy is released similar to a small nuclear bomb. We had to relocate to a new lab when ours combusted..."/>
						<GroupPublication title='Endomorph Entropy Escalates Energetically' description='We made up a complicated sounding name to get research funding after our lab exploded. It worked. Now we have pizza tuesdays... and thursdays.'/>
						<GroupPublication title='Zebraonic Zenogs Zane Zealously' description='This one has no excuse. We like alliteration.'/>
					</GroupPublicationsContainer>
				</div>
			</div>
		)
	}
}

// Our Admin Panel on Group Page. Uses GroupPerson componenets
const Administrators = () => {
	return(
		<div id='group-admins'>
			<h1>Admins</h1>
			<div className='group-photos'>
				<GroupPerson src='/img/sara.jpg'>Dr. Sara, 3rd of her name, Queen of the Andals</GroupPerson>
				<GroupPerson src='/img/akira.jpg'>Dr. Akira, Sorcerer Supreme</GroupPerson>
				<GroupPerson src='/img/meha.jpg'>Dr. Meha, of the Nights Watch</GroupPerson>
				<GroupPerson src='/img/nolan.jpg'>Dr. Nolan, Eunuch</GroupPerson>
			</div>
		</div>
	)
}

const Members = () => {
	return(
		<div id='group-members'>
			<h1>Members</h1>
			<div className='group-photos'>
				<GroupPerson src='/img/headshots/jwolfe.jpg'>Mr. Wolfe, the wolfiest.</GroupPerson>
				<GroupPerson src='/img/headshots/abanka.jpg'>Smarty McSmarty-Pants, of the Pants.</GroupPerson>
				<GroupPerson src='/img/headshots/sbutrus.jpg'>Sal of the Salient Sals.</GroupPerson>
				<GroupPerson src='/img/headshots/sschnell.jpg'>Another Smarty McSmarty-Pants, ft. Whiteboard</GroupPerson>
				<GroupPerson src='/img/headshots/eprantzalos.jpg'>Smarty McSmarty-Capris, of the Short Pants</GroupPerson>
				<GroupPerson src='/img/headshots/hwang.jpg'>Han of the Handiest Hans.</GroupPerson>
			</div>
		</div>
	)
}

// Used whenever we need a person img for Group Page
// Takes src for image
// Takes whatever is in its angle brackets for its name
const GroupPerson = (props) => {
	return(
		<div className='group-person'>
			<img src={props.src} />
			<div className='group-person-overlay'>
				<span>{props.children}</span>
			</div>
		</div>

	);
}

export default GroupPage;
