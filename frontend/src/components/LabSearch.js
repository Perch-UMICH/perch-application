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
				"pun making",
				"spectography",
				"total phosphorus digestion",
				"PCR",
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
				"security",
				"fintech",
				"machine learning",
				"software development",
				"biomedical devices",
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
			search_list: [],
			in_filter: false,
			skill_search: false,
			interest_search: false
		}
	}

	componentWillMount() {
		this.setState({filtered_catalog: this.state.skills_catalog, catalog: this.state.skills_catalog, search_list: this.state.skills});
  	}

	filterList(event) {
		var updatedList = this.state.catalog;
    	updatedList = updatedList.filter(function(item){
      	return item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
        	event.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList, in_filter: true});
	}

	handleClickAdd(interest) {
		this.setState((prevState) => {
			if (prevState.search_list.indexOf(interest) == -1) {
				var temp_add = prevState.search_list;
				temp_add.push(interest);
				return {search_list: temp_add};
			}
		});
	}

	handleClickDelete(interest) {
		this.setState((prevState) => {
			var temp_delete = prevState.search_list;
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			return {search_list: temp_delete};
		});
	}

	handleSearchType(event) {
		if (event.target.value === 'skills') {
			this.setState((prevState) => {
				return {filtered_catalog: this.state.skills_catalog, catalog: this.state.skills_catalog, search_list: this.state.skills};
			});
		}
		else {
			this.setState((prevState) => {
				return {filtered_catalog: this.state.interests_catalog, catalog: this.state.interests_catalog, search_list: this.state.interests};
			});
		}
	}

	render() {
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
								return (<span key={interest} onClick={this.handleClickAdd.bind(this, interest)} > <Bubble txt={interest} type='adder' /> </span>)
							})}
						</div>
					</div>

					<div className='interest-section col s6'>
						<div className='interest-body'>
							{this.state.search_list.map((interest) => {
								return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest)}> <Bubble txt={interest} type='deleter' /> </span>)
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