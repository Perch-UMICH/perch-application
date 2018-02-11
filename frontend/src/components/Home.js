import React, {Component} from 'react';
import AboveTheFold from './AboveTheFold.js';
import WhoAreYou from './WhoAreYou.js';
import InterestedForm from './InterestedForm.js';
import SignUp from './SignUp.js';
import './Home.css'
class Home extends Component {
	
	render() {
		return(
			<div>
				<AboveTheFold />
				<WhoAreYou />
				<div className="sub-team-header-2-full valign-wrapper">
					<SignUp />
				</div>
			</div>
		);
	}
}

export default Home;