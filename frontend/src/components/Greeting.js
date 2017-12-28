import React, {Component} from 'react';
import './Greeting.css';

class Greeting extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
		<div className="greeting container center-align">
    		<hr />
    		<div className="meet-team">{this.props.message}</div>
    		<hr />
 		</div>
		); 
	}
}

export default Greeting;