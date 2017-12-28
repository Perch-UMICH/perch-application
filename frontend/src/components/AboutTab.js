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
			<div className={this.tabType}>
				<br />
			  <div className="header container center-align white-text ">
			    <div> {this.props.header} </div>
			    <p className="white-text flow-text">{this.props.body}</p>
			    <br />
			  </div>
			</div>
		);
	}
}

export default AboutTab;