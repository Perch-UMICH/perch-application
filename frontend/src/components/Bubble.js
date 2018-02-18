import React, {Component} from 'react';
import './Bubble.css'

class Bubble extends Component {
	constructor(props) {
		super(props);

	}

	render() {

		if (this.props.type == 'adder') {
			this.interior = <i className="material-icons bubble-icon">add</i>
		}
		else {
			this.interior = <i className="material-icons bubble-icon">clear</i>
		}

		return(
			<div className='bubble' >
				{this.interior}
				{this.props.txt}
			</div>
		);
	}
}

export default Bubble;