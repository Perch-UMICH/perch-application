import React, {Component} from 'react';
import BasicButton from './BasicButton';
import shave from 'shave';
import './LabListItem.css';

class LabListItem extends Component {

	render() {
		return (
			<div className='lab-list-item shadow'>
				<a href={this.props.profile_link}><img src={this.props.img} className='lab-list-item-img' alt=''/></a>
				<div className='lab-list-tag-container'>
					<a className='null-link-style' href={this.props.profile_link}><div className='lab-list-name'>{this.props.labName}</div></a>
					<span className='hide-on-small-only'>{this.props.tags.slice(0, 3).map((tag) => <div key={tag} className='floater-item'>{tag}</div>)}</span>
				</div>
				
				{this.props.spots > 1 ? <div className="lab-list-btn-container"><BasicButton dest={this.props.profile_link} msg={`${this.props.spots} spots`}/></div> : <div className="lab-list-btn-container"><BasicButton dest={this.props.profile_link} msg={`${this.props.spots} spot `}/></div>}
			</div>
		);
	}
}

export default LabListItem;