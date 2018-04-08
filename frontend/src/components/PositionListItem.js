import React, {Component} from 'react';
import BasicButton from './BasicButton';
import shave from 'shave';

class PositionListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='lab-list-item shadow'>
				<div className='lab-list-tag-container'>
					<a className='null-link-style'><div className='lab-list-name hide-on-small-only'>{this.props.positionTitle}</div></a>
					{/*<span className='hide-on-small-only'>{this.props.tags.map((tag) => <div key={tag} className='floater-item'>{tag}</div>)}</span>*/}
					<div className='floater-item'>{this.props.time_comm}</div>
					<div className='floater-item'>Open Slots: {this.props.open_slots}</div>
				</div>
				
				<div className="lab-list-btn-container">
					{ this.props.selected ? <BasicButton dest={this.props.dest} msg={this.props.btn_msg} /> : <div>Select User Type Above</div>}
				</div>
			</div>
		);
	}
}

export default PositionListItem;