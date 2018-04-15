import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Team from './components/Team';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignUpPage from './components/SignUpPage';
import ConfirmEmail from './components/ConfirmEmail';
import Timeline from './components/Timeline';
import About from './components/About';
import Login from './components/Login';
import StudentProfile from './components/StudentProfile';
import LabMatch from './components/LabMatch';
import PickYourInterests from './components/PickYourInterests';
import LabWebsite from './components/LabWebsite';
import UploadImage from './components/UploadImage';
import LabTextInfo from './components/LabTextInfo';
import LabSpecifications from './components/LabSpecifications';
import PastResearch from './components/PastResearch';
import StudentBio from './components/StudentBio';
import NotableClasses from './components/NotableClasses';
import ExternalLinks from './components/ExternalLinks';
import UpdateExternalLinks from './components/UpdateExternalLinks';
import ProfPage from './components/ProfPage';
import Apply from './components/Apply';
import CreatePosition from './components/CreatePosition';
import ViewApplicants from './components/ViewApplicants';
import ScheduleInterview from './components/ScheduleInterview';
import PickInterview from './components/PickInterview';
import Settings from './components/Settings';
import Feedback from './components/Feedback';
import ForgotPassword from './components/ForgotPassword';
import UpdateContact from './components/UpdateContact';
import './components/TapTarget.css';
import './components/general.css';

class Router extends Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<NavBar />
					<div>
						<Switch>
							<Route path='/home' component={ Home } />
							<Route path='/team' component={ Team } />
							<Route path='/about' component={ About } />
							<Route path='/timeline' component={ Timeline } />
							<Route path='/login' component={ Login } />
							<Route path='/sign-up' component={ SignUpPage } />
							<Route path='/confirm-email' component={ ConfirmEmail } />
							<Route path='/student-profile' component={ StudentProfile } />
							<Route path='/student-profile/:studentSlug' component={ StudentProfile } />
							<Route path='/lab-match' component={ LabMatch }/>
							<Route path='/pick-your-interests' component={ PickYourInterests }/>
							<Route path='/update-interests' component={ PickYourInterests }/>
							<Route path='/lab-skills' component={ PickYourInterests }/>
							<Route path='/update-skills' component={ PickYourInterests }/>
							<Route path='/lab-website' component={ LabWebsite }/>
							<Route path='/upload-image' component={ UploadImage }/>
							<Route path='/update-image' component={ UploadImage }/>
							<Route path='/lab-name' component= { LabTextInfo }/>
							<Route path='/lab-description' component= { LabTextInfo }/>
							<Route path='/update-lab-description' component= { LabTextInfo }/>
							<Route path='/lab-specifications' component= { LabSpecifications }/>
							<Route path='/update-lab-specifications' component= { LabSpecifications }/>
							<Route path='/update-contact' component= { UpdateContact }/>
							<Route path='/enter-contact' component= { UpdateContact }/>
							<Route path='/past-research' component={ PastResearch }/>
							<Route path='/update-past-research' component={ PastResearch }/>
							<Route path='/notable-classes' component={ NotableClasses }/>
							<Route path='/update-notable-classes' component={ NotableClasses }/>
							<Route path='/student-bio' component={ StudentBio }/>
							<Route path='/update-student-bio' component={ StudentBio }/>
							<Route path='/external-links' component={ ExternalLinks } />
							<Route path='/update-external-links' component={ ExternalLinks } />
							<Route path='/edit-external-links' component={ UpdateExternalLinks } />
							<Route path='/prof-page' component={ ProfPage }/>
							<Route path='/prof-page/:labSlug' component={ ProfPage }/>
							<Route path='/apply/:labSlug' component={ Apply } />
							<Route path='/create-position' component={ CreatePosition } />
							<Route path='/view-applicants' component={ ViewApplicants } />
							<Route path='/view-applicants/:posId' component={ ViewApplicants } />
							<Route path='/schedule-interview' component={ ScheduleInterview } />
							<Route path='/schedule-interview/:studentSlug' component={ ScheduleInterview } />
							<Route path='/pick-interview' component={ PickInterview } />
							<Route path='/settings' component={ Settings } />
							<Route path='/feedback' component={ Feedback }/>
							<Route path='/forgot-password' component={ ForgotPassword } />
							<Route path='/forgot-password/:token' component={ ForgotPassword } />
							<Route path='/' component={ Home } />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default Router;