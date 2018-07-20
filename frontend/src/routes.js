import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Team from './components/publicStatic/about/Team';
import NavBar from './components/utilities/NavBar';
import Home from './components/publicStatic/Home';
import SignUpPage from './components/publicStatic/SignUpPage';
import ConfirmEmail from './components/user/maintenance/ConfirmEmail';
import Timeline from './components/publicStatic/about/Timeline';
import About from './components/publicStatic/about/About';
import Login from './components/publicStatic/Login';
import StudentProfile from './components/user/individual/StudentProfile';
import LabMatch from './components/labSearch/LabMatch';
import PickYourInterests from './components/user/individual/PickYourInterests';
import LabWebsite from './components/user/group/LabWebsite';
import UploadImage from './components/user/maintenance/UploadImage';
import LabTextInfo from './components/user/group/LabTextInfo';
import LabSpecifications from './components/user/group/LabSpecifications';
import PastResearch from './components/user/individual/PastResearch';
import StudentBio from './components/user/individual/StudentBio';
import NotableClasses from './components/user/individual/NotableClasses';
import ExternalLinks from './components/ExternalLinks';
import UpdateExternalLinks from './components/user/maintenance/UpdateExternalLinks';
import ProfPage from './components/user/group/ProfPage';
import Apply from './components/user/Apply';
import CreatePosition from './components/user/group/CreatePosition';
import ViewApplicants from './components/user/group/ViewApplicants';
import ScheduleInterview from './components/user/ScheduleInterview';
import PickInterview from './components/user/PickInterview';
import Settings from './components/user/maintenance/Settings';
import Feedback from './components/utilities/Feedback';
import ForgotPassword from './components/user/maintenance/ForgotPassword';
import UpdateContact from './components/user/maintenance/UpdateContact';
import Footer from './components/utilities/Footer';
import PrivacyPolicy from './components/publicStatic/PrivacyPolicy';
import TermsOfService from './components/publicStatic/TermsOfService';
import GroupPage from './components/user/group/GroupPage';
import LabDashboard from './components/labSearch/LabDashboard';
import './components/utilities/TapTarget.css';
import './components/utilities/general.css';


import {Test} from './components/user/individual/StudentEditors';

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
							<Route path='/about/:tab' component={ About } />
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
							<Route path='/prof-page' component={ GroupPage }/>
							<Route path='/prof/:profSlug' component={ ProfPage }/>
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
							<Route path='/privacy-policy' component={ PrivacyPolicy } />
							<Route path='/terms-of-service' component={ TermsOfService } />
							<Route path='/dashboard' component={ LabDashboard } />
							<Route path='/test' component={ Test } />
							<Route path='/' component={ Home } />
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default Router;
