import React, {Component} from 'react';
import PositionListItem from './PositionListItem';
import $ from 'jquery';
import './PositionsTab.css';

class PositionsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var btn_msg, dest = '';
		var selected = false;
		if (this.props.user_type === 'faculty') {
			dest = '/view-applicants';
			selected = true;
			$('#showOnFaculty').show();
		}
		else if (this.props.user_type === 'student') {
			btn_msg = 'apply';
			dest = this.props.apply_dest;
			selected=true;
			$('#showOnFaculty').hide();
		}
		return (
			<div className="tab-fit tab-container shadow">
				<div className='tab-header positions-tab-header'>{this.props.header.toUpperCase()}<a href='/create-position' id="showOnFaculty"><i className="material-icons interest-editor">add</i></a></div>
				<div className='positions-tab'>
					{ (this.props.positions.length === 0) ? <div className="center-align">You haven't created any positions! Click the '+' in the top right of this box to post an application</div> : null}
				    {this.props.positions.map((position) => {
						return (
							<PositionListItem key={position.name} positionName={position.name} tags={position.skills} dest={dest} btn_msg={btn_msg || `applicants (${position.num_applicants})`} selected={selected}/>);
					})}
				</div>
			</div>
		);
	}
}

export default PositionsTab;