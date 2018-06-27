import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import {permissionCheck, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, getLabPositions, getLabPreferences, isStudent, isLab} from '../../../helper.js'
import './GroupPage.css'

class ProfPage extends Component {

	expandDescription() {
        let toggleExpanderIcons = () => {
            let expanderIcons = document.getElementById(`group-page-expand-icons`)
            for (let i = 0; i < expanderIcons.children.length; i++)
                expanderIcons.children[i].innerText = (expanderIcons.children[i].innerText == 'expand_more') ? 'expand_less' : 'expand_more';
            expanderIcons.classList.toggle('active-blue')
        }
        toggleExpanderIcons();
        alert('todo')
    }

	render() {
		return(
			<div id='group-page'>
				<div id='group-page-column-L'>Left column</div>
				<div id='group-page-column-R'>Right Column</div>
				<div id='group-page-main'>
					<div id='group-page-quickview'>
						<img src='https://thumbs.dreamstime.com/b/group-students-laboratory-lab-science-classroom-92938916.jpg' id='group-page-coverimage' />
						<div id='group-page-name'>Dr. Jone's Chemistry Lab</div>
						<div id='group-page-description'>Our laboratory is very interested in understanding the functional and organizational patterns underlying complex systems with our major emphasis being on protein interactions and the role of post-translational modifications in controlling those interactions.  We rely primarily on mass spectrometry and protein chemistry techniques to address problems in these areas.</div>
						<div id='group-page-expand-icons' onClick={this.expandDescription.bind(this)}>
	                        <i className='material-icons'>expand_more</i>
	                        <i className='material-icons'>expand_more</i>
	                        <i className='material-icons'>expand_more</i>
	                    </div>
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