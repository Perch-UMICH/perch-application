import React, {Component} from 'react';

class SquareButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<a href={this.props.destination} id="join-btn" className="waves-effect btn-flat btn-large" data-mt-duration="300">{this.props.label}</a>
		);
	}
}

export default SquareButton;