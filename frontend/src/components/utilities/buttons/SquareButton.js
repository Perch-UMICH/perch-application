import React, {Component} from 'react';

class SquareButton extends Component {
	constructor(props) {
	super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		if (this.props.superClick) {
			this.props.superClick();
		}
	}

	render() {
		return(
			<a onClick={this.onClick} href={this.props.destination} id="join-btn" className="waves-effect btn-flat btn-large" data-mt-duration="300">{this.props.label}</a>
		);
	}
}

export default SquareButton;