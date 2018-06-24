/* Team Member Card Class for the Perch Periodic Table */
/* (or more popularly, the per(ch)iodic table ;))      */

import React, { Component } from 'react';
import './TableCard.css';

class TableCard extends Component {
	constructor(props) {
		super(props);

		var member = props.member ? props.member : {};
		this.state = { member };

	}

	render() {
		var mem = this.state.member;
		var initials = mem.firstName.charAt(0).toUpperCase();
		initials += mem.lastName !== "" ? mem.lastName.charAt(0).toLowerCase() : "";

		var tableCardCSS = "table-card ";
		var tableCardCoverCSS = "table-card-cover ";
		if (this.props.team) {
			tableCardCSS += this.props.team + "-tcs";
			tableCardCoverCSS += this.props.team + "-tccbg";
		}

		return(
			<div className={tableCardCSS}>
				<div className="table-hovercard">{mem.firstName} {mem.lastName}</div>
        <img
					className="table-card-image"
					alt="team member"
					src={`img/${mem.firstName}.jpg`.toLowerCase()} />
        <div className={tableCardCoverCSS}></div>
        <div className="table-card-inits"> {initials} </div>
    	</div>
		);
	}
}

export default TableCard;
