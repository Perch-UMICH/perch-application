import React, {Component} from 'react';
import './GroupProjectRequirement.css'
// import {exists} from '../../../backend/index.js'

export default class GroupProjectRequirement extends Component {
	render() {
		return(
			<div className='group-project-requirement'>
				{this.props.title &&  <span>{this.props.title}</span>}
				<div>
					{this.props.value}
				</div>
			</div>
		)
	}
}