import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Team from './components/Team';
import NavBar from './components/NavBar';
import Home from './components/Home.js';
import Timeline from './components/Timeline.js';
import About from './components/About.js';
import Login from './components/Login.js';
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
							<Route path='/' component={ Home } />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default Router;