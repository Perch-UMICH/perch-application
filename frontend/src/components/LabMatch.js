import React, {Component} from 'react';
import LabSearch from './LabSearch';
import LabList from './LabList';

class LabMatch extends Component {
	render() {
		return (
			<div className='shift-down container center-align'>
				<LabSearch />
				<div className='row'>
					<LabList header="Lab Match" />	
				</div>
			</div>
		);
	}
}

export default LabMatch;