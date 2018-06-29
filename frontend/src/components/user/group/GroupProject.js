import React, {Component} from 'react';
import ExpanderIcons from '../../utilities/ExpanderIcons'
import './GroupProject.css'

export class GroupProject extends Component {
	expand() {
		document.getElementById(`group-project-${this.props.title}`).children[2].classList.toggle('expand')
	}

	render() {
		return(
			<div id={`group-project-${this.props.title}`} className='group-project'>
				<div className='group-project-name'>
					<span>{this.props.title}</span>
					{this.props.urop && <span className='group-project-tag'>UROP</span>}
				</div>
				<div className='group-project-keywords'>{this.props.keywords}</div>
				<div className='group-project-description'>{this.props.description}<div className='group-project-requirement'>
					<span>Minimum Requirements</span>
					<div>
						<div>blah blah</div>
						<div>blah blah</div>
					</div>
				</div>
				<div className='group-project-requirement'>
					<span>Minimum Requirements</span>
					<div>
						<div>40 hours</div>
					</div>
				</div></div>
				
				<div className='group-project-apply'>Apply</div>
				<div className='group-project-openings'><b>{this.props.spots}</b> {this.props.spots - 1 ? "spots" : "spot"}</div>
				<ExpanderIcons id={`group-project-${this.props.title}`} classBase='group-project' action={this.expand.bind(this)}/>
			</div>
		)
	}
}

export const GroupProjectContainer = (props) => <div id='group-project-container'>{props.children}</div>

export const GroupPublicationsContainer = (props) => <div id='group-publications'>{props.children}</div>