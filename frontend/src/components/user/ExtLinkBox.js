import React, {Component} from 'react';
import './ExtLinkBox.css';

var FontAwesome = require('react-fontawesome');

class ExtLinkBox extends Component {

	render() {
		if (this.props.dest)
		 	return (<div className='ext-link-box'>{this.props.children}</div>);
		else
		 	return(null);
	 }
}

export default ExtLinkBox;