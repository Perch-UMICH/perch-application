import React, {Component} from 'react';
import AboveTheFold from './AboveTheFold.js';
import './Home.css'
class Home extends Component {
	
	render() {
		return(
			<div>
				<AboveTheFold />
				{<img src='/assets/PERCH_MASCOT.svg' className='logo hide-on-med-and-down' style={{position: 'fixed', zIndex: '999', height: '250px', bottom: '-75px', left: '-40px'}}/>}
			</div>
		);
	}
}

export default Home;