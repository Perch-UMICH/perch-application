import React, {Component} from 'react';
import AboveTheFold from './AboveTheFold.js';
import PerchStory from '../about/story/PerchStory.js';
import Team from '../about/team/Team.js';
import './Home.css'
import {getAllTags, getAllSkills, getAllLabs} from '../../../helper.js'


class Home extends Component {
	constructor(props) {
		super(props)
		getAllLabs().then((resp) => console.log(resp))
	}
	render() {
		return(
			<div>
				<AboveTheFold />
				<PerchStory page='main'/>
				<Team/>
			

				{/*<img src='/assets/PERCH_MASCOT.svg' className='logo hide-on-med-and-down' style={{position: 'fixed', zIndex: '999', height: '250px', bottom: '-75px', left: '-40px'}} alt=""/>*/}
			</div>
		);
	}
}

export default Home;