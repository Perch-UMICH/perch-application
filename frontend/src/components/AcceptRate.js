import React, {Component} from 'react';
// import './AcceptRate.css';

class AcceptRate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '/update-student-bio'
		};
		if (this.props.user_type === 'faculty') {
			this.state.dest = '/update-lab-description';
		}
	}

	componentDidMount() {
		if (this.props.rate < 50) {
			document.getElementById('rate').classList.add('bad-red')
		}
		else {
			document.getElementById('rate').classList.add('good-blue')
		}
	}

	render() {
		return (
			<div className='tab-container'>
				<div className='tab-header' style={{fontSize: '16px', padding: '15px 10px'}}>
					{"Accept Rate".toUpperCase()}
					<a href={this.state.dest}><i className="material-icons interest-editor edit-icon">create</i></a>
				</div>
				<div id='rate' className='contact-tab center-align' style={{fontWeight: 'bold'}}>
					{`${this.props.rate} %`}
				</div>
			</div>
		);
	}
}

export default AcceptRate;