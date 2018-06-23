import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Timeline from './Timeline'
import Team from './Team'
import PerchStory from './PerchStory'
import './About.css';

class About extends Component {
	componentDidMount() {
		this.showStory();
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

	clearAboutBody() {
		ReactDOM.unmountComponentAtNode(document.getElementById('about-body'))
	}

	showTimeline() {
		this.highlightAboutNav('timeline');
		this.clearAboutBody();
		ReactDOM.render(<Timeline />, document.getElementById('about-body'))
	}

	showStory() {
		this.highlightAboutNav('perch story')
		this.clearAboutBody();
		ReactDOM.render(<PerchStory />, document.getElementById('about-body'))
	}

	showTeam() {
		this.highlightAboutNav('team')
		this.clearAboutBody();
		ReactDOM.render(<Team />, document.getElementById('about-body'))
	}

	render() {
		return (
			<div className="about center-align">
				<div className="about-nav">
					<div className='about-button about-active' onClick={() => this.showStory()}>Perch Story</div>
					<div className='about-button' onClick={() => this.showTeam()}>Team</div>
					<div className='about-button' onClick={() => this.showTimeline()}>Timeline</div>
				</div>
				<div id='about-body' className='about-body'></div>
			</div>

		);
	}
}

export default About;