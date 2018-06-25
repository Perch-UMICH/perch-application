import React, { Component } from 'react';
import './TableCard.css';


class TableCard extends Component {
	constructor(props) {
		super(props);

		var member = props.member ? props.member : {};

		this.state = {
			member
		};
	}

	render() {
		var member = this.state.member;
		var initials = member.firstName.charAt(0).toUpperCase();
		initials += member.lastName !== "" ? member.lastName.charAt(0).toLowerCase() : "";

		var tableCardCSS = "table-card ";
		var tableCardCoverCSS = "table-card-cover ";
		if (this.props.team) {
			tableCardCSS += this.props.team + "-tcs";
			tableCardCoverCSS += this.props.team + "-tccbg";
		}

		return(
			<div className={tableCardCSS}>
		          <img className="table-card-image" alt="team member" src={`img/${member.firstName}.jpg`.toLowerCase()} />
		          <div className={tableCardCoverCSS}></div>
		          <div className="table-card-inits"> {initials} </div>
        	</div>
		);
	}
}

export default TableCard;

/*
<div className="card table-card">
  <div className="card-image waves-effect waves-block waves-light">
    <img className="activator table-card-image" alt="team member" src="img/benji.jpg" />
  </div>
  <div className="card-content">
    <span className="activator grey-text text-darken-4 flow-text">{this.props.firstName}<i className="material-icons right">expand_less</i></span>
    <p className="grey-text">{this.props.position}</p>{`table-card-cover ${this.props.team}-tccbg`}
  </div>
  <div className="card-reveal">
    <span className="card-title white-text text-darken-4">{`${this.props.firstName} ${this.props.lastName}`}<i className="material-icons right">close</i></span>
	</div>
</div>*/