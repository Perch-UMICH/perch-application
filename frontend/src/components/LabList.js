import React, {Component} from 'react';
import LabListItem from './LabListItem';
import './LabList.css';
class LabList extends Component {

	componentDidUpdate() {
		let list = document.getElementById('lab-list-container');
		let filler = document.getElementById('lab-list-filler');

		if (!list.children.length) {
			filler.innerHTML = 'Use Search To Find Labs';
		}
		else {
			filler.innerHTML = '';
		}
	}
	render() {
		return (
		<div className='col s12'>
			<div className='col s12 lab-list shadow' >
				<div className='lab-list-header white-text'>Lab Match <i className='lab-list-icon material-icons'>arrow_downward</i></div>
				<div id='lab-list-filler'></div>
				<div id='lab-list-container'>
					{this.props.labs.map((lab) => <LabListItem key={lab.name} img={lab.img} labName={lab.name} tags={lab.tags} profile_link={lab.profile_link} spots={lab.spots} />)}
				</div>
			</div>
		</div>
		);
	}
}

export default LabList;