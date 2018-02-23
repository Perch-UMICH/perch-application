import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Team from './components/Team';
import NavBar from './components/NavBar';
import Home from './components/Home';
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
import NotableClasses from './components/NotableClasses';
import ProfPage from './components/ProfPage';
import Apply from './components/Apply';
import CreatePosition from './components/CreatePosition';
import ViewApplicants from './components/ViewApplicants';
import Feedback from './components/Feedback';
import Test from './components/Test';
import './components/TapTarget.css';
import './components/general.css';

class Router extends Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<NavBar loggedIn='true' />
					<div>
						<Switch>
							<Route path='/home' component={ Home } />
							<Route path='/team' component={ Team } />
							<Route path='/about' component={ About } />
							<Route path='/timeline' component={ Timeline } />
							<Route path='/login' component={ Login } />
							<Route path='/student-profile' component={ StudentProfile } />
							<Route path='/lab-match' component={ LabMatch }/>
							<Route path='/pick-your-interests' component={ PickYourInterests }/>
							<Route path='/update-interests' component={ PickYourInterests }/>
							<Route path='/lab-skills' component={ PickYourInterests }/>
							<Route path='/update-skills' component={ PickYourInterests }/>
							<Route path='/lab-website' component={ LabWebsite }/>
							<Route path='/upload-image' component={ UploadImage }/>
							<Route path='/lab-name' component= { LabTextInfo }/>
							<Route path='/lab-description' component= { LabTextInfo }/>
							<Route path='/lab-specifications' component= { LabSpecifications }/>
							<Route path='/past-research' component={ PastResearch }/>
							<Route path='/notable-classes' component={ NotableClasses }/>
							<Route path='/prof-page' component={ ProfPage }/>
							<Route path='/prof-page/:labSlug' component={ ProfPage }/>
							<Route path='/apply/:labSlug' component={ Apply } />
							<Route path='/create-position' component={ CreatePosition } />
							<Route path='/view-applicants' component={ ViewApplicants } />
							<Route path='/feedback' component={ Feedback }/>
							<Route path='/test' component={ Test }/>
							<Route path='/' component={ Home } />
						</Switch>
					</div>
				{/*<TapTarget />*/}
				</div>
			</BrowserRouter>
		);
	}
}

export default Router;