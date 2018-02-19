import React, {Component} from 'react';
import './LabSearch.css';


class LabSearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='form labSearch shadow'>
				<div className='row'>
					<div className='col s12 m12 l2 left-align lab-search-label grey-text text-darken-1'>LAB SEARCH</div>
					<div className='col s12 m7 '><input id='lab-topic' className='lab-search-input' type='text' placeholder='keywords' /></div>
					<div className='col s12 m3 l3'>
						<button className="btn waves-effect waves-light submit-btn lab-search-btn"
			        			type="submit" 
			        			name="action"
			        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#0277bd', letterSpacing: '2px'}}
			        		>Search
			        	</button>
			        </div>
				</div>
			</div>
		);
	}
}

export default LabSearch;