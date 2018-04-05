import React, {Component} from 'react';
import AboutTab from './AboutTab.js';
import './About.css';

class About extends Component {
	render() {
		return (
			<div className="shift-down">
				<AboutTab 
				header='Our Mission'
				body='Perch wants to make entering research easier and more accessible for everyone by connecting labs and students via an university-integrated online platform and offering a peer-taught lab fundamentals teaching curriculum.'
				textColor='black'
				/>

				<AboutTab 
				header='The Perch Platform'
				body='We are building an inuitive online platform to connect undergraduates to lab faculty. Undergraduates can create profiles, upload qualifications, and view and apply to labs. Lab faculty can post their lab pages and what qualifications they’d like applicants to have.'
				textColor='white'
				background='blue'
				/>

				<AboutTab 
				header='The Perch Curriculum'
				body='We will simplify the process of training undergraduate researchers. Since most undergraduate students accepted into labs don’t have prior research experience, graduate students spend a lot of time training students in basic lab techniques. Instead we’d like to train students en masse, which would be much more efficient and encourage labs to take on more undergraduates.'
				textColor='black'
				/>

			</div>

		);
	}
}

export default About;