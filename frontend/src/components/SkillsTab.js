import React, {Component} from 'react';
import './SkillsTab.css';
class SkillsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='tab-header'>SKILLS</div>
				<div className='skills-tab'>
					<div className='floater-item'>plating</div>
					<div className='floater-item'>chromatography</div>
					<div className='floater-item'>R</div>
					<div className='floater-item'>C++</div>
					<div className='floater-item'>MatLab</div>
					<div className='floater-item'>Javascript</div>
					<div className='floater-item'>React.js</div>
					<div className='floater-item'>Node.js</div>
					<div className='floater-item'>Meteor.js</div>
					<div className='floater-item'>Kali Linux</div>
					<div className='floater-item'>Pen Testing</div>
				</div>
			</div>
		);
	}
}

export default SkillsTab;