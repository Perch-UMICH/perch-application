import React, {Component} from 'react';
import LabListItem from './LabListItem';
import './LabList.css';
class LabList extends Component {
	render() {
		return (
		<div className='col s12'>
			<div className='col s12 lab-list shadow' >
				<div className='lab-list-header white-text'>{this.props.header}</div>
				{this.props.labs.map((lab) => <LabListItem key={lab.name} img={lab.img} labName={lab.name} tags={lab.tags} profile_link={lab.profile_link} spots={lab.spots} />)}
			</div>
		</div>
		);
	}
}

export default LabList;