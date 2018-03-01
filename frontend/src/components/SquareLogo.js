import React, { Component } from 'react';
import './SquareLogo.css'
import Typed from 'typed.js';

class SquareLogo extends Component {
	constructor(props) {
		super(props);

		// var options = {
		//   strings: ["Research", "Finding a lab", "Finding lab assistants", "Learning lab skills", "Making an impact", "Research"],
		//   typeSpeed: 65
		// }

		// var typed = new Typed(".element", options);
		// var typed = new Typed(".element-mobile", options);
	}

	componentDidMount() {
		var options = {
		  strings: ["Research", "Finding a lab", "Finding lab assistants", "Learning lab skills", "Making an impact", "Research"],
		  typeSpeed: 65
		}

		var typed = new Typed(".element", options);
		var typed = new Typed(".element-mobile", options);
	}

	render() {
		return(
			<div className="center-align">
				<div className="awkward-desktop container hide-on-small-only">De-Awkwardizing<div id="research-mobile"><span className="element"></span></div></div>
      			<div className="awkward-mobile container hide-on-med-and-up white-text">De-Awkwardizing<div id="research-mobile"><span className="element-mobile"></span></div></div>
			</div>
		);
	} 
}

export default SquareLogo;