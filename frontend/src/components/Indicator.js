import React, {Component} from 'react';
import './Indicator.css'

class Indicator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.type == 'on')
			this.type = 'indicator-on';
		else 
			this.type = 'indicator-off';
		return(
			<div className={`indicator ${this.type}`}>
				{this.props.msg}
			</div>
		);
	}
}

export default Indicator;