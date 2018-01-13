import React, {Component} from 'react';
import LabListItem from './LabListItem';
import './LabList.css';
class LabList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className='col s12 m6 l4'>
			<div className='col s12 lab-list shadow' >
				<div className='lab-list-header white-text'>{this.props.header}</div>
				<LabListItem img='#' preview="This is a sample prev. Will fix long inputs."/>
				<LabListItem img='#' preview="This is a sample prev. Will fix long inputs."/>
				<LabListItem img='#' preview="This is a sample prev. Will fix long inputs."/>
				<LabListItem img='#' preview="This is a sample prev. Will fix long inputs."/>
			</div>
		</div>
		);
	}
}

export default LabList;