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
		var route = '/update-skills?user_type=' + this.props.user_type;
		return (
			<div>
				<div className='tab-header'>
					SKILLS <a href={route} ><i className="material-icons interest-editor">add</i></a>
				</div>
				<div className='skills-tab'>
					{this.state.skills.map((skill) => <div key={skill} className='floater-item'>{skill}</div>)}
				</div>
			</div>
		);
	}
}

export default SkillsTab;