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
				<div className='center-align valign-wrapper hide-on-small-only' style={{ width: '125px', height: '150px', border: '3px solid gold', position: 'absolute', marginTop: '15px', marginLeft: '100px', backgroundColor: 'white', color: 'grey', borderRadius: '10px', letterSpacing: '1px', padding: '2px', boxShadow: '1px 2px 10px grey'}}>Optimize Social Innovation Challenge Winner</div>
				<div className='center-align valign-wrapper hide-on-small-only' style={{ width: '125px', height: '150px', border: '3px solid gold', position: 'absolute', marginTop: '15px', marginLeft: '250px', backgroundColor: 'white', color: 'grey', borderRadius: '10px', letterSpacing: '1px', padding: '2px', boxShadow: '1px 2px 10px grey'}}>UofM Library Minigrant Recipient</div>
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