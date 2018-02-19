import React, {Component} from 'react';
import BasicButton from './BasicButton'
import './LabListItem.css';

class LabListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='lab-list-item shadow'>
				<img src={this.props.img} className='lab-list-item-img'/>
				<div className='lab-list-tag-container'>
					<div className='lab-list-name'>{this.props.labName}</div>
					{this.props.tags.map((tag) => <div className='floater-item'>{tag}</div>)}
				</div>
				
				<div className="lab-list-btn-container"><BasicButton msg='apply'/></div>
			</div>
		);
	}
}

export default LabListItem;