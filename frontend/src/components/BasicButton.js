import React, {Component} from 'react';
import './BasicButton.css';

class BasicButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className="btn waves-effect waves-light basic-btn"  type="submit" name="action">{this.props.msg}</button>
		);
	}
}

export default BasicButton;