import React, {Component} from 'react';
import LabSearch from './LabSearch';
import LabList from './LabList';

class LabMatch extends Component {
	render() {
		return (
			<div className='shift-down container center-align'>
				<LabSearch />
				{/*<div style={{height: '100px', width: '300px', border: '1px solid white', margin: '20px auto'}}>Here are your labs</div>*/}
				<div className='row'>
					<LabList header="Lab Match" />	
				</div>
			</div>
		);
	}
}

export default LabMatch;