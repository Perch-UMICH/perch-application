import React, {Component} from 'react';
import SquareButton from './SquareButton';
import './PastResearch.css';

class PastResearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Rodriguez's Neurosurgery Lab",
			research: '',
		};
		if (this.props.location.pathname.split('/')[1] === 'update-past-research') {
			this.state.research = "Dr. Patil's Neurosurgery Lab\nDr. R's Pharmaceutics Lab\n";
		}
	}

	updateResearch(event) {
		this.setState({
			research: event.target.value
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var header = "List Any Past Research";
		var dest = '/notable-classes';
		var btn_msg = 'next';
		if (url_arr[1] === 'update-past-research') {
			header = "Update Past Research";
			dest = '/student-profile';
			btn_msg = 'back';
		}
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>{header}</div>
					<form className='container'>
						<textarea className='past-research-input' id="textArea" type="text" 
							value= {this.state.research}
							placeholder={this.state.placeholder} 
							onChange={event => this.updateResearch(event)}>
						</textarea>
						<SquareButton destination={dest} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default PastResearch;