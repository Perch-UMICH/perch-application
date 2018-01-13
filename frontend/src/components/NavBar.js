import React, {Component} from 'react';
import './NavBar.css'
import $ from 'jquery';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.loggedIn = this.props.loggedIn;
	}

	// componentDidMount() {
	// 	//console.log($(".button-collapse"));
	// 	// $(".button-collapse").sideNav({
	//  //  	edge: 'right',
	//  //  	draggable: true
 //  // 		});
	// }

	// componentDidUpdate() {
	// 	console.log($(".button-collapse"));
	// 	$(".button-collapse").sideNav({
	//   	edge: 'right',
	//   	draggable: true
 //  		});
	// }

	render() {

		if (this.props.loggedIn === 'true') {
			var navItems = <div>
				<li><a className="nav-item" href="/student-profile">PROFILE</a></li>
			    <li><a className="nav-item" href="/lab-match">LABS</a></li>
			    <li><a className="nav-item contact-nav" href="#">PERCH CERTIFIED</a></li>
			</div>
		}
		else {
			var navItems = <div>
				<li><a className="nav-item" href="/about">ABOUT US</a></li>
			    <li><a className="nav-item" href="/team">TEAM</a></li>
			    <li><a className="nav-item" href="/timeline">TIMELINE</a></li>
			    <li><a className="nav-item contact-nav" href="/login">JOIN PERCH</a></li>
			</div>
		}

		return(
			<div className="navbar-fixed">
			    <nav>
			      <div className="nav-wrapper">
			        <a href="#" data-activates="mobile-demo" className="right button-collapse hide-on-large-only"><i id="hamburger" className="material-icons">menu</i></a>
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			  
			        {navItems}
		
			      </ul>

			        <ul className="left">
			          <a className='no-hover' href="/home"><img className="nav-logo" alt="logo" src="assets/LOGO.svg" /></a>
			        </ul>

			        <ul className="center hide-on-med-and-up">
			          <a className='no-hover' href="/home"><span className="nav-option nav-logo-text grey-text text-lighten-3" style={{fontSize: '30px'}}>PERCH</span></a>
			        </ul>

			        <ul className="left">
			          <a className='no-hover' href="/home"><span className="nav-option nav-logo-text hide-on-small-only grey-text text-lighten-3" >PERCH</span></a>
			        </ul>

			        <ul className="side-nav light-blue lighten-4" id="mobile-demo">
			         
			          <li><a className="nav-item" href="./views/about.html">ABOUT US</a></li>
			          <li><a className="nav-item" href="./views/team.html">TEAM</a></li>
			          <li><a className="nav-item" href="./views/timeline.html">TIMELINE</a></li>
			          <li><a className="nav-item" href="./views/get-involved.html">LOGIN</a></li>
			          <li><a className="nav-item" href="./views/contact.html">CONTACT US</a></li>
			        </ul>
			      </div>
			      <div className='right'>
			      
			      </div>
			    </nav>

			  </div>
		);
	}
}
	// INCLUDE WHEN JQUERY WORKS
  // Initialize collapse button
  // document.getElementsByClassName()
  // document.getElementsByClassName("button-collapse")[0].sideNav({
  // 	edge: 'right',
  // 	draggable: true
  // });
  // $(".button-collapse").sideNav({
  // 	edge: 'right',
  // 	draggable: true
  // });

export default NavBar;