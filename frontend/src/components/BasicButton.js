import React, {Component} from 'react';
import './BasicButton.css';

class BasicButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a href='#'><button className="btn waves-effect waves-light basic-btn" name="action">{this.props.msg}</button></a>
		);
	}
}

export default BasicButton;