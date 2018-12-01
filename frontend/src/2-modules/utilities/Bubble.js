import React, {Component} from 'react';
import './Bubble.css'

class Bubble extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		var bubbleCSS = "bubble ";
		if (this.props.type === 'adder') {
			this.interior = <i className="material-icons bubble-icon">add</i>
		}
		else {
			bubbleCSS += "selected"
			this.interior = <i className="material-icons bubble-icon">clear</i>
		}

		return(
			<div className={bubbleCSS} >
				{this.interior}
				<div className="bubble-text">{this.props.txt}</div>
			</div>
		);
	}
}

export default Bubble;
