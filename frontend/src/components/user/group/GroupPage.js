import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import {permissionCheck, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, getLabPositions, getLabPreferences, isStudent, isLab} from '../../../helper.js'
import './GroupPage.css'

class ProfPage extends Component {
	render() {
		return(
			<div id='group-page'>
				<div id='group-page-column-L'>Left column</div>
				<div id='group-page-column-R'>Right Column</div>
				<div id='group-page-main'>
					<div id='group-page-quickview'>
						<img src='https://lh3.googleusercontent.com/laRC-BGx_XtNwr29GCZ3L04qmkxTuZVVpHEPGaSzKcaGP2Nng06ANc-OGad1UWpDlmAtyCByLdRXxqAouiqi6z0h82lNzM8n=w1600-rj' id='group-page-coverimage' />
					</div>
					<div id='group-page-projects'>
						projects
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