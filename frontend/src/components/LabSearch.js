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
			your_skills: [
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
			your_interests: [
				"security",
				"fintech",
				"machine learning",
				"software development",
				"biomedical devices",
			],
			skills: [],
			interests: [],
			catalog: [],
			filtered_catalog: [],
			in_filter: false,
			search_skills: true,
			search_interests: false
		}
	}

	componentWillMount() {
		this.setState({filtered_catalog: this.state.skills_catalog, 
						catalog: this.state.skills_catalog});
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
			if (this.state.search_skills) {
				if (prevState.skills.length == 0) {
					let temp_add = [interest];
					return {skills: temp_add};
				}
				else if (prevState.skills.indexOf(interest) == -1) {
					let temp_add = prevState.skills;
					temp_add.push(interest);
					return {skills: temp_add};
				}
			}
			else {
				if (prevState.interests.length == 0) {
					let temp_add = [interest];
					return {interests: temp_add};
				}
				else if (prevState.interests.indexOf(interest) == -1) {
					let temp_add = prevState.interests;
					temp_add.push(interest);
					return {interests: temp_add};
				}
			}
		});
	}

	handleClickDelete(interest, type) {
		this.setState((prevState) => {
			if (type === 'skill') {
				var temp_delete = prevState.skills;
				temp_delete.splice(temp_delete.indexOf(interest), 1);
				return {skills: temp_delete};
			}
			else {
				var temp_delete = prevState.interests;
				temp_delete.splice(temp_delete.indexOf(interest), 1);
				return {interests: temp_delete};
			}
		});
	}

	handleSearchType(event) {
		if (event.target.value === 'skills') {
			this.setState((prevState) => {
				return {filtered_catalog: this.state.skills_catalog, 
						catalog: this.state.skills_catalog, 
						search_skills: true,
						search_interests: false};
			});
		}
		else {
			this.setState((prevState) => {
				return {filtered_catalog: this.state.interests_catalog, 
						catalog: this.state.interests_catalog, 
						search_skills: false,
						search_interests: true};
			});
		}
	}

	handleImport(import_type) {
		if (import_type === 'skills') {
			this.setState((prevState, import_type) => {
				let temp_add = prevState.skills;
				prevState.your_skills.map((skill) => {
					if (prevState.skills.indexOf(skill) === -1) {
						temp_add.push(skill);
					}
				});
				return {skills: temp_add};
			});
		}
		else {
			this.setState((prevState, import_type) => {
				let temp_add = prevState.interests;
				prevState.your_interests.map((interest) => {
					if (prevState.interests.indexOf(interest) === -1) {
						temp_add.push(interest);
					}
				});
				return {interests: temp_add};
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

				{/* These two radio butons are used to switch between searching for skills/interests */}
				<div className="row center-align">
					<p className="fe-test">Search By:</p>
					<input className="radio" name="user_type" type="radio" id="skills" value="skills" onChange={this.handleSearchType.bind(this)} required />
					<label htmlFor="skills">Skills</label>
					<input className="radio" name="user_type" type="radio" id="interests" value="interests" onChange={this.handleSearchType.bind(this)} required />
					<label htmlFor="interests">Interests</label>
				</div>

				{/* These two buttons import the skills/interests of a user into the search */}
				<div className="row center-align">
					<button className="btn waves-effect waves-light submit-btn lab-search-btn"
		        			type="submit" 
		        			name="action"
		        			onClick={this.handleImport.bind(this, 'skills')}
		        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#0277bd', letterSpacing: '2px'}}
		        		>Add Your Skills
		        	</button>
		        	<button className="btn waves-effect waves-light submit-btn lab-search-btn"
		        			type="submit" 
		        			name="action"
		        			onClick={this.handleImport.bind(this, 'interests')}
		        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#0277bd', letterSpacing: '2px'}}
		        		>Add Your Interests
		        	</button>
				</div>

				{/* This container holds the list of skills/interests you can choose from,
					as well as the skills/interests that have been chosen already. This container should
					only show up when a user has their cursor clicked on the search */}
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
							<p> SKILLS </p>
							{this.state.skills.map((interest) => {
								return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, 'skill')} > <Bubble txt={interest} type='deleter' /> </span>)
							})}
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<p> INTERESTS </p>
							{this.state.interests.map((interest) => {
								return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, 'interest')} > <Bubble txt={interest} type='deleter' /> </span>)
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