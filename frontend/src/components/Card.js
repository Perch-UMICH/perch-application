import React, { Component } from 'react';
import './Card.css';


class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {name: 'Benji'};
	}

	render() {
		return(
			<div className="left-align col s6 m4 l3">
				<div className="card">
		          <div className="card-image waves-effect waves-block waves-light">
		            <img className="activator" alt="team member" src={this.props.img} />
		          </div>
		          <div className="card-content">
		            <span className="activator grey-text text-darken-4 flow-text">{this.props.firstName}<i className="material-icons right">expand_less</i></span>
		            <p className="grey-text">{this.props.position}</p>
		          </div>
		          <div className="card-reveal">
		            <span className="card-title white-text text-darken-4">{`${this.props.firstName} ${this.props.lastName}`}<i className="material-icons right">close</i></span>
		            <p /*style="opacity: 1.0"*/></p>
          		</div>
        	</div>
        </div>
		);
	}
}

export default Card;