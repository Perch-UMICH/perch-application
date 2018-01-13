import React, {Component} from 'react';
import './LabListItem.css';

class LabListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='lab-list-item shadow'>
				<img src={this.props.img} className='lab-list-item-img'/>
				<div>{this.props.preview}</div>
			</div>
		);
	}
}

export default LabListItem;