import React, {Component} from 'react';
import ExpanderIcons from '../../utilities/ExpanderIcons'
import GroupProjectRequirement from './GroupProjectRequirement'
import './GroupProject.css'

export class GroupProject extends Component {
	expand() {
		document.getElementById(`group-project-${this.props.title}`).children[2].classList.toggle('expand')
	}

	render() {
		return(
			<div id={`group-project-${this.props.title}`} className='group-project'>
				<div className='group-project-name-container'>
					<span className='group-project-name'>
						<span>{this.props.title}</span>
						{this.props.urop && <span className='group-project-tag'>UROP</span>}</span>
					
				</div>
				<div className='group-project-keywords'>{this.props.keywords}</div>
				<div className='group-project-description'>
					<div>{this.props.description}</div>
					{/* Edited for now since we don't have much
						<div className='group-project-requirements-header'>Minimum Requirements</div>*/}
					<GroupProjectRequirement title='Time commitment' value={this.props.time_commit}/>
					{/*Edited For now since not in back end
					<GroupProjectRequirement title='GPA' value={this.props.gpa}/>
					<GroupProjectRequirement title='Year' value={this.props.year}/>
					<GroupProjectRequirement value="MISSING"/>
					*/}
					{/* Edited for now ssince we don't have much
					<div className='group-project-requirements-header'>Skills</div>*/}
					<GroupProjectRequirement value="MISSING"/>
				</div>
				
				<div className='group-project-apply'>Apply</div>
				{this.props.spots && <div className='group-project-openings'><b>{this.props.spots}</b> {this.props.spots - 1 ? "spots" : "spot"}</div>}
				<ExpanderIcons id={`group-project-${this.props.title}`} classBase='group-project' action={this.expand.bind(this)}/>
			</div>
		)
	}
}

export const GroupProjectContainer = (props) => {
	return(
		<div id='group-project-container'>
			<h1>Projects</h1>
			<div>{props.children}</div>
		</div>
	)
}