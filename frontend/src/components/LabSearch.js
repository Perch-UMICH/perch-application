import React, {Component} from 'react';
import './LabSearch.css';
import Bubble from './Bubble';
import LabList from './LabList';
import './PickYourInterests.css';


class LabSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			skills_catalog: [
				"plating",
				"chromotography",
				"MatLab",
				"R",
				"C++",
				"Pen Testing",
			],
			skills: [
				"pun making",
				"spectography",
				"total phosphorus digestion",
				"PCR",
			],
			interests_catalog: [
				"oncology",
				"orange",
				"orangutan",
				"apples and orange",
				"virology",
				"basketweaving",
				"history",
				"chemistry",
				"physics",
				"astro-physics",
			],
			interests: [
				"security",
				"fintech",
				"machine learning",
				"software development",
				"biomedical devices",
			],
			catalog: [],
			filtered_catalog: [],
			in_filter: false,
			skill_search: false,
			interest_search: false
		}
	}

	componentWillMount() {
		if (this.state.skill_search) {
			this.setState({filtered_catalog: this.state.skills_catalog, catalog: this.state.skills_catalog});
		}
		else {
			this.setState({filtered_catalog: this.state.interests_catalog, catalog: this.state.interests_catalog});
		}
  	}

	filterList(event) {
		var updatedList = this.state.catalog;
    	updatedList = updatedList.filter(function(item){
      	return item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
        	event.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList, in_filter: true});
	}

	handleClickAdd(interest, temporary) {
		this.setState((prevState) => {
			var temp_add = prevState.interests;
			var temp_delete = prevState.catalog;
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			if (temporary != "default") {
				temp_filter.splice(temp_filter.indexOf(interest), 1);
			}
			else if (this.state.in_filter) {
				temp_filter.splice(temp_filter.indexOf(interest), 1);
			}

			return {catalog: temp_delete, interests: temp_add, filtered_catalog: temp_filter};
		});
	}

	handleClickDelete(interest, temporary) {
		this.setState((prevState) => {
			var temp_delete = prevState.interests;
			var temp_add = prevState.catalog;
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			let check = prevState.in_filter;
			if (interest.includes(temporary.toString())) {
				if (temporary != "default") {
					temp_filter.push(interest);
				}
			}
			else if (check && (temporary == "default")) {
				temp_filter.push(interest);
			}

			return {catalog: temp_add, interests: temp_delete, filtered_catalog: temp_filter};
		});
	}

	handleSearchType(event) {
		if (event.target.value === 'skills') {
			this.setState((prevState) => {
				return {skill_search: true, interest_search: false, filtered_catalog: this.state.skills_catalog, catalog: this.state.skills_catalog};
			});
		}
		else {
			this.setState((prevState) => {
				return {skill_search: false, interest_search: true, filtered_catalog: this.state.interests_catalog, catalog: this.state.interests_catalog};
			});
		}
	}

	render() {
		let temporary = "default";
		if (document.getElementById('lab-name')) {
			let len = document.getElementById('lab-name').value.length;
			if (len != 0) {
				temporary = document.getElementById('lab-name').value;
			}
		}

		return (
			<div>
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
				<div className="row center-align">
					<p className="fe-test">Search By:</p>
					<input className="radio" name="user_type" type="radio" id="skills" value="skills" onChange={this.handleSearchType.bind(this)} required />
					<label htmlFor="skills">Skills</label>
					<input className="radio" name="user_type" type="radio" id="interests" value="interests" onChange={this.handleSearchType.bind(this)} required />
					<label htmlFor="interests">Interests</label>
				</div>
				<div className='row interest-container'>
					<div className='interest-section col s6 left-align'>
						<div className='interest-body'>
							{this.state.filtered_catalog.map((interest) => {
								return (<span key={interest} onClick={this.handleClickAdd.bind(this, interest, temporary)} > <Bubble txt={interest} type='adder' /> </span>)
							})}
						</div>
					</div>

					<div className='interest-section col s6'>
						<div className='interest-body'>
							{this.state.interests.map((interest) => {
								return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, temporary)}> <Bubble txt={interest} type='deleter' /> </span>)
							})}
						</div>
					</div>
				</div>
				<div className='row'>
					<LabList header="Lab Match" labs={this.props.labs} />	
				</div>
			</div>
		);
	}
}

export default LabSearch;