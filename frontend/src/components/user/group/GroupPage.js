import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import GroupQuickview from './GroupQuickview'
import {GroupProject, GroupProjectContainer, GroupPublicationsContainer} from './GroupProject'
import {permissionCheck, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, getLabPositions, getLabPreferences, isStudent, isLab} from '../../../helper.js'
import './GroupPage.css'

class GroupPage extends Component {
	render() {
		return(
			<div id='group-page'>
				<div id='group-page-column-L'>
					<Administrators />
				</div>
				<div id='group-page-column-R'>Right Column</div>
				<div id='group-page-main'>
					<GroupQuickview />
					<GroupProjectContainer>
						<div className='group-header'>Projects</div>
						<GroupProject title='Data Analyst' spots='1' keywords='paid, computer science, machine learning' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.And we need hands on the job. And we need hands on the job.And we need hands on the job. And we need hands on the job.' urop/>
						<GroupProject title='Coffee Runner' spots='2' keywords='for-credit, chemistry, physics' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job. And we need hands on the job. And we need hands on the job.'/>
					</GroupProjectContainer>

					<GroupPublicationsContainer>
						<div className='group-header'>Publications</div>
					</GroupPublicationsContainer>
				</div>
			</div>
		)
	}
}

const Administrators = () => {
	return(
		<div id='group-admins'>
			<div className='group-header'>Admins</div>
			<GroupPerson src='/img/sara.jpg'>Dr. Sara, 3rd of her name, Queen of the Andals</GroupPerson>
			<GroupPerson src='/img/akira.jpg'>Dr. Akira, Sorcerer Supreme</GroupPerson>
			<GroupPerson src='/img/meha.jpg'>Dr. Meha, of the Nights Watch</GroupPerson>
			<GroupPerson src='/img/nolan.jpg'>Dr. Nolan, Eunuch</GroupPerson>
		</div>
	)
}

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