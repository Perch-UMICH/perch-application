import React, {Component} from 'react';
import SquareLogo from './SquareLogo';
import MoveTo from 'moveto';
import LoginButtons from './LoginButtons';
import './AboveTheFold.css';

class AboveTheFold extends Component {

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function(){
	      const easeFunctions = {
	        easeInQuad: function (t, b, c, d) {
	          t /= d;
	          return c * t * t + b;
	        },
	        easeOutQuad: function (t, b, c, d) {
	          t /= d;
	          return -c * t* (t - 2) + b;
	        }
	      }
	      const moveTo = new MoveTo({
	        ease: 'easeInQuad'
	      }, easeFunctions);
	      const triggers = document.getElementsByClassName('js-trigger');
	      for (var i = 0; i < triggers.length; i++) {
	        moveTo.registerTrigger(triggers[i]);
	      }
	    });
	}

	render() {
		return(
			  <div className="tab3 valign-wrapper">
			    <div className="container center-align">
				    <img className="logo" src="assets/new-logo.png" data-tilt />
				    <SquareLogo />
				    <p className="letter-spacer flow-text white-text">We make research more accessible for everyone</p>
				    <LoginButtons  />		    
			    </div>
			  </div>
		);
	}
}

export default AboveTheFold;

//<a href="#form" id="join-btn" className="waves-effect btn-flat btn-large js-trigger" data-mt-duration="300">join perch</a>