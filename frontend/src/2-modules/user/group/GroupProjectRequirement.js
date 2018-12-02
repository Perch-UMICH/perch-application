import React, {Component} from 'react';
import './GroupProjectRequirement.css'
import {exists} from '../../../helper.js'

export default class GroupProjectRequirement extends Component {
	render() {
		return(
			<div className='group-project-requirement'>
				{exists(this.props.title) &&  <span>{this.props.title}</span>}
				<div>
					{this.props.value}
				</div>
			</div>
		)
	}
}