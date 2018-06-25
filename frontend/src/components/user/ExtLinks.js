import React, {Component} from 'react';
import ExtLinkBox from './ExtLinkBox.js'
import {permissionCheck} from '../../helper.js'
import './ExtLinks.css';

class ExtLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '/edit-external-links',
		};
	}

	render() {
		return(
			<div>
				<div className='ext-links mobile-header tab academic-tab-header'>Links
					<a href='#' className="null-link-style" >
					{ permissionCheck() && 
						<a href={this.state.dest}><i className="material-icons interest-editor edit-icon" style={{position: 'absolute', right: '0'}} >create</i></a>
					}
					</a>
				</div> 

				<ExtLinkBox dest={this.props.linkedin}>Linkedin</ExtLinkBox>
 				<ExtLinkBox dest={this.props.resume}>Resume</ExtLinkBox>
 				<ExtLinkBox dest={this.props.website}>Website</ExtLinkBox>
			</div>
		);
	 }
}

export default ExtLinks;