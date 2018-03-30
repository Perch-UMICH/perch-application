import React, {Component} from 'react';
import './SkillsTab.css';
import {getCurrentUserId} from '../helper.js'
class SkillsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: window.location.pathname.split( '/' )[2],
		}
	}

	render() {
		var route = '/update-skills?user_type=' + this.props.user_type;
		return (
			<div className='tab-container'>
				<div className='tab-header'>
					SKILLS 
					{ getCurrentUserId() == this.state.id && 
						<a href={route} ><i className="material-icons interest-editor">add</i></a>
					}
				</div>
				<div className='skills-tab'>
					{this.props.skills.map((skill) => <div key={skill.id} className='floater-item'>{skill.name}</div>)}
				</div>
			</div>
		);
	}
}

export default SkillsTab;