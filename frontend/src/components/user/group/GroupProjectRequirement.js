import React, {Component} from 'react';
import './GroupProjectRequirement.css'

export default class GroupProjectRequirement extends Component {
	render() {
		return(
			<div className='group-project-requirement'>
				<span>{this.props.title}</span>
				<div>
					{this.props.details.map(item => <div>{item}</div>)}
				</div>
			</div>
		)
	}
}