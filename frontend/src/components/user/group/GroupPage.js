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
						<div className='group-page-project'>Project 1</div>
						<div className='group-page-project'>Project 2</div>
					</div>
					<div id='group-page-publications'>
						publications
					</div>
				</div>
			</div>
		)
	}
}

export default ProfPage;