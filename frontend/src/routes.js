import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './2-modules/utilities/NavBar';
import Home from './2-modules/publicStatic/home/Home';
import SignUpPage from './2-modules/publicStatic/signup/SignUpPage';
import ConfirmEmail from './2-modules/user/maintenance/ConfirmEmail';
import About from './2-modules/publicStatic/about/About';
import Login from './2-modules/publicStatic/login/Login';
import StudentProfileContainer from './2-modules/user/individual/student/StudentProfileContainer';
import LabMaster from './2-modules/labSearch/LabMaster.js';
import ProfPage from './2-modules/user/group/ProfPage';
import Apply from './2-modules/user/Apply';
import CreatePosition from './2-modules/user/group/CreatePosition';
import ScheduleInterview from './2-modules/user/ScheduleInterview';
import PickInterview from './2-modules/user/PickInterview';
import Settings from './2-modules/user/maintenance/Settings';
import Feedback from './2-modules/utilities/Feedback';
import ForgotPassword from './2-modules/user/maintenance/ForgotPassword';
import EnterContact from './2-modules/user/individual/EnterContact';
import Footer from './2-modules/utilities/Footer';
import PrivacyPolicy from './2-modules/publicStatic/info/PrivacyPolicy';
import TermsOfService from './2-modules/publicStatic/info/TermsOfService';
import GroupPage from './2-modules/user/group/GroupPage';
import LabDashboard from './2-modules/labSearch/LabDashboard';
import StudentOnboarding from './2-modules/user/individual/StudentOnboarding';
import FacultyOnboarding from './2-modules/user/individual/FacultyOnboarding';
import Help from './2-modules/publicStatic/help/Help';
import Join from './2-modules/publicStatic/join/Join';
import CreateLab from './2-modules/user/CreateLab';
import Challenge from './2-modules/publicStatic/join/Challenge';
import Nothing from './2-modules/utilities/tests/Nothing';
import Dashboard from './2-modules/user/individual/dashboard/dashboard'
import './2-modules/utilities/TapTarget.css';
import './0-base/general.scss';


import UserTest from './2-modules/utilities/tests/UserTest';

class Router extends Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<NavBar />
					<div>
						<Switch>
							<Route path='/home' component={ Home } />
							<Route path='/about' component={ About } />
							<Route path='/about/:tab' component={ About } />
							<Route path='/login' component={ Login } />
							<Route path='/sign-up' component={ SignUpPage } />
							<Route path='/confirm-email' component={ ConfirmEmail } />
							<Route path='/student-profile' component={ StudentProfileContainer } />
							<Route path='/student-profile/:studentSlug' component={ StudentProfileContainer } />
							<Route path='/lab-match' component={ LabMaster }/>
							<Route path='/prof-page' component={ GroupPage }/>
							<Route path='/prof/:profSlug' component={ ProfPage }/>
							<Route path='/apply/:labId' component={ Apply } />
							<Route path='/create-position' component={ CreatePosition } />
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
							<Route path='/student-onboarding' component={ StudentOnboarding } />
							<Route path='/faculty-onboarding' component={ FacultyOnboarding } />
							<Route path='/help' component={ Help } />
							<Route path='/join' component= { Join } />
							<Route path='/test' component={ UserTest } />
							<Route path='/challenge' component={ Challenge } />
							<Route path='/create-lab' component={ CreateLab } />
							<Route path='/nothing' component={ Nothing } />
							<Route path='/hypercontrol' component={ Dashboard } />
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
