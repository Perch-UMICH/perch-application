import React, {Component} from 'react';
import './SkillsTab.css';
class SkillsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			skills: [
				'plating',
				'chromatography',
				'R',
				'C++',
				'MatLab',
				'Javascript',
				'React.js',
				'Node.js',
				'Meteor.js',
				'Kali Linux',
				'Pen Testing',
			]
		}
	}

	render() {
		return (
			<div>
				<div className='tab-header'>SKILLS</div>
				<div className='skills-tab'>
					{this.state.skills.map((skill) => <div className='floater-item'>{skill}</div>)}
				</div>
			</div>
		);
	}
}

export default SkillsTab;