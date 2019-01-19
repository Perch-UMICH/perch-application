import React, {Component} from 'react';
import { parse } from 'query-string';
import ReactDOM from 'react-dom';
import Timeline from './timeline/Timeline'
import Team from './team/Team'
import PerchStory from './story/PerchStory'
import './About.css';
//import {updateUrlQuery} from '../../../backend/index.js'

class About extends Component {
	constructor() {
		super()
		this.showTeam = this.showTeam.bind(this)
		this.showTimeline = this.showTimeline.bind(this)
		this.showStory = this.showStory.bind(this)
	}
	componentDidMount() {
		let tab_type = this.props.location ? parse(this.props.location.search).tab : "story"
		switch(tab_type) {
			case 'story':
				this.showStory();
				break;
			case 'team':
				this.showTeam();
				break;
			case 'timeline':
				this.showTimeline();
				break;
			default:
				this.showStory();
				break;
		}
	}

	getNavs() {
		return document.getElementsByClassName('about-button');
	}

	//General function to highlight about navigator
	highlightAboutNav(input) {
		let navs = this.getNavs();
		{/*Removes active nav item*/}
		for (var i = navs.length - 1; i >= 0; i--) 
			navs[i].classList.remove('about-active');
		{/*Activates nav item*/}
		for (var i = navs.length - 1; i >= 0; i--) 
			if (input === navs[i].innerText.toLowerCase())
				navs[i].classList.add('about-active')
	}

	
	updateUrlQuery (query, value) {
	let new_query = '?' + query + '=' + value
	window.history.pushState(null, null, new_query)
	}

	clearAboutBody() {
		ReactDOM.unmountComponentAtNode(document.getElementById('about-body'))
	}

	showTimeline() {
		this.highlightAboutNav('timeline');
		this.clearAboutBody();
		this.updateUrlQuery('tab', 'timeline');
		ReactDOM.render(<Timeline />, document.getElementById('about-body'))
	}

	showStory() {
		this.highlightAboutNav('perch story')
		this.clearAboutBody();
		this.updateUrlQuery('tab', 'story');
		ReactDOM.render(<PerchStory />, document.getElementById('about-body'))
	}

	showTeam() {
		this.highlightAboutNav('the perch team')
		this.clearAboutBody();
		this.updateUrlQuery('tab', 'team');
		ReactDOM.render(<Team />, document.getElementById('about-body'))
	}

	render() {
		return (
			<div className="about">
				<div className="about-nav">
					<h2 className='about-button' onClick={this.showStory}>Perch Story</h2>
					<h2 className='about-button' onClick={this.showTeam}>The Perch Team</h2>
					<h2 className='about-button' onClick={this.showTimeline}>Timeline</h2>
				</div>
				<div id='about-body' className='about-body'></div>
			</div>

		);
	}
}

export default About;