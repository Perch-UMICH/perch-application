import React, {Component} from 'react';

class AboutTab extends Component {
	constructor(props) {
		super(props);
		this.tabType = '';

		if (props.background === 'blue') {
			this.tabType = 'tab4s';
		}
	}

	render() {
		return (
			//Sets background and text color 
			<div className={this.tabType + ' ' + this.props.textColor + '-text-about'}>
				<br />
			  <div className='header container center-align'>
			    <div> {this.props.header} </div>
			    <p className='flow-text'>{this.props.body}</p>
			    <br />
			  </div>
			</div>
		);
	}
}

export default AboutTab;