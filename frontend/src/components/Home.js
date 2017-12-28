import React, {Component} from 'react';
import AboveTheFold from './AboveTheFold.js';
import WhoAreYou from './WhoAreYou.js';
import InterestedForm from './InterestedForm';
import './Home.css'
class Home extends Component {
	
	render() {
		return(
			<div>
				<AboveTheFold />
				<WhoAreYou />
				<InterestedForm />
			</div>
		);
	}
}

export default Home;