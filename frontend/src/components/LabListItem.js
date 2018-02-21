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
				<a href={this.props.profile_link}><img src={this.props.img} className='lab-list-item-img'/></a>
				<div className='lab-list-tag-container'>
					<div className='lab-list-name'>{this.props.labName}</div>
					{this.props.tags.map((tag) => <div key={tag} className='floater-item'>{tag}</div>)}
				</div>
				
				<div className="lab-list-btn-container"><BasicButton dest={this.props.dest} msg='apply'/></div>
			</div>
		);
	}
}

export default LabListItem;