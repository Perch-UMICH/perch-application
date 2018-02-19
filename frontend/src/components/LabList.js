import React, {Component} from 'react';
import LabListItem from './LabListItem';
import './LabList.css';
class LabList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className='col s12'>
			<div className='col s12 lab-list shadow' >
				<div className='lab-list-header white-text'>{this.props.header}</div>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
				<LabListItem img='#' labName="Benji's Neurosurgery Lab"/>
			</div>
		</div>
		);
	}
}

export default LabList;