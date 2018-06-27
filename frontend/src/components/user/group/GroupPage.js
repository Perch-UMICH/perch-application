import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import GroupQuickview from './GroupQuickview'
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
					<div id='group-page-project-container'>
						<div className='group-header'>Projects</div>
						<div className='group-page-project'>
							<div className='group-project-name'>
								<span>Data Analyst</span>
								<span className='group-project-tag'>UROP</span>
							</div>
						</div>
						<div className='group-page-project'>
							<div className='group-project-name'>
								<span>Coffee Runner</span>
							</div>
						</div>
						
					</div>
					<div id='group-page-publications'>
						<div className='group-header'>Publications</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ProfPage;