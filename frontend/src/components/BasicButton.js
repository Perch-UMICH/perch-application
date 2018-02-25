import React, {Component} from 'react';
import './BasicButton.css';

class BasicButton extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.onClick)
	}

	render() {
		return (
			<div>{this.props.color === 'light' ? <a onClick={this.onClick} href={this.props.dest}><button className="btn waves-effect waves-blue waves-light basic-btn-light" name="action">{this.props.msg}</button></a> : <a onClick={this.onClick} href={this.props.dest}><button className="btn waves-effect waves-blue waves-light basic-btn" name="action">{this.props.msg}</button></a> }</div>
		);
	}
}

export default BasicButton;