import React, {Component} from 'react';
import './Indicator.css'

class Indicator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.type == 'on') {
			this.type = 'indicator-on';
			this.pre = 'yes ';
		}
		else {
			this.pre = 'no ';
			this.type = 'indicator-off';
		}
		return(
			<div className={`indicator center-align ${this.type}`}>
				{this.pre + this.props.msg}
			</div>
		);
	}
}

export default Indicator;