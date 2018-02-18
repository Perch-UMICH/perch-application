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
import MakeAnAccount from './components/MakeAnAccount';
import PastResearch from './components/PastResearch';
import NotableClasses from './components/NotableClasses';
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
							<Route path='/make-an-account' component={ MakeAnAccount }/>
							<Route path='/past-research' component={ PastResearch }/>
							<Route path='/notable-classes' component={ NotableClasses }/>
							<Route path='/' component={ Home } />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default Router;