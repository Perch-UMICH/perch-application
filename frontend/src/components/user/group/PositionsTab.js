import React, {Component} from 'react';
import PositionListItem from './PositionListItem';
import {isLab, isStudent} from '../../../helper.js'
import $ from 'jquery';
import './PositionsTab.css';

class PositionsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var btn_msg, dest = '';
		var selected = false;
		if (isLab()) {
			dest = '/view-applicants';
			selected = true;
			btn_msg = 'view applicants'; // Can remove once applicant number (num_applicants) is accessible
			$('#showOnFaculty').show();
		}
		else if (isStudent()) {
			btn_msg = 'apply';
			dest = this.props.apply_dest;
			selected=true;
			$('#showOnFaculty').hide();
		}
		return (
			<div className="tab-fit tab-container shadow">
				<div className='tab-header positions-tab-header'>{this.props.header.toUpperCase()}<a href='/create-position' id="showOnFaculty"><i id='positions-tab-editor' className="material-icons edit-icon">add</i></a></div>
				<div className='positions-tab'>
					{ this.props.positions.length === 0 && isLab() && <div className="center-align">You haven't created any positions! Click the '+' in the top right of this box to post an application</div> }
				    { this.props.positions.length === 0 && isStudent() && <div className="center-align">This lab hasn't created any positions!</div> }
				    {this.props.positions.map((position) => {
				    	console.log("POSITION");
				    	console.log(position);
				    	let dest_instance = dest + '/' + position.id;
						return (
							<PositionListItem key={position.title} id={position.id} positionTitle={position.title} time_comm={position.time_commitment} open_slots={position.open_slots} dest={dest_instance} btn_msg={btn_msg || `applicants (${position.num_applicants})`} selected={selected}/>);
					})}
				</div>
			</div>
		);
	}
}

export default PositionsTab;