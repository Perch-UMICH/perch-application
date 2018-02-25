import React, {Component} from 'react';
import './SkillsTab.css';
class SkillsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var route = '/update-skills?user_type=' + this.props.user_type;
		return (
			<div className='tab-container'>
				<div className='tab-header'>
					SKILLS <a href={route} ><i className="material-icons interest-editor">add</i></a>
				</div>
				<div className='skills-tab'>
					{this.props.skills.map((skill) => <div key={skill} className='floater-item'>{skill}</div>)}
				</div>
			</div>
		);
	}
}

export default SkillsTab;