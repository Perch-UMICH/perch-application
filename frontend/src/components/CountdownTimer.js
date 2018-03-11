import React, {Component} from 'react';

class CountdownTimer extends Component {

	componentDidMount() {
		// Set the date we're counting down to
		var countDownDate = new Date("March 20, 2018 15:37:25").getTime();

		// Update the count down every 1 second
		var x = setInterval(function() {

		  // Get todays date and time
		  var now = new Date().getTime();

		  // Find the distance between now an the count down date
		  var distance = countDownDate - now;

		  // Time calculations for days, hours, minutes and seconds
		  var days = Math.floor(distance / (1000 * 60 * 60 * 24));

		  // Display the result in the element with id="demo"
		  document.getElementById("countdown").innerHTML = days + " Days Until Release";

		  // If the count down is finished, write some text 
		  if (distance < 0) {
		    clearInterval(x);
		    document.getElementById("countdown").innerHTML = "EXPIRED";
		  }
		}, 1000);
	}

	render() {
		return (
			 <header className="center-align">
			 	<div className="container text-center">
			      <div id="countdown"></div>
			    </div>
			 </header>
		);
	}
}

export default CountdownTimer;