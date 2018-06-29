import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import GroupQuickview from './GroupQuickview'
import {GroupProject, GroupProjectContainer, GroupPublicationsContainer} from './GroupProject'
import {permissionCheck, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, getLabPositions, getLabPreferences, isStudent, isLab} from '../../../helper.js'
import './GroupPage.css'

class ProfPage extends Component {
	render() {
		return(
			<div id='group-page'>
				<div id='group-page-column-L'>Left column</div>
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

export default ProfPage;