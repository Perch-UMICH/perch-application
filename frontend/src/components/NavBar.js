import React, {Component} from 'react';
import './NavBar.css'

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.loggedIn = this.props.loggedIn;
	}

	render() {

		if (this.props.loggedIn === 'true') {
			var navItems = <div>
				<li><a className="nav-item" href="/student-profile">PROFILE</a></li>
			    <li><a className="nav-item" href="/lab-match">LABS</a></li>
			    {/*<li><a className="nav-item contact-nav" href="#">PERCH CERTIFIED</a></li>*/}
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

			        <ul className="left hide-on-small-only">
			          <a className='no-hover' href="/home"><img className="nav-logo" alt="logo" src="/assets/branch_logo.png" /></a>
			        </ul>

			        <ul className="mobile-logo hide-on-med-and-up">
			          <a className='no-hover' href="/home"><img className="nav-logo" alt="logo" src="/assets/branch_logo.png" /></a>
			        </ul>


			  {/*      <ul className="center hide-on-med-and-up">
			  			          <a className='no-hover' href="/home"><span className="nav-option nav-logo-text grey-text text-lighten-3" style={{fontSize: '30px'}}></span></a>
			  			        </ul>
			  
			  			        <ul className="left">
			  			          <a className='no-hover' href="/home"><span className="nav-option nav-logo-text hide-on-small-only grey-text text-lighten-3" ></span></a>
			  			        </ul>*/}

			        <ul className="side-nav light-blue lighten-4" id="mobile-demo">
			         	{navItems}
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