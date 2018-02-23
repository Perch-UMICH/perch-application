import React, {Component} from 'react';
import './HugeButton.css';

class HugeButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a href='#'><button className="btn waves-effect waves-light huge-btn shadow" name="action">{this.props.msg}</button></a>
		);
	}
}

export default HugeButton;