import React, {Component} from 'react';
import './TeamPhoto.css'
class TeamPhoto extends Component {
	render() {
		return(
			<div className="hide-on-small-only">
  				<img className="group-photo" alt="The Perch Team" src="img/group1.jpg" />
  				<br />
			</div>
		);
	}
}

export default TeamPhoto;