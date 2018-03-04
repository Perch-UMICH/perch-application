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
				"astrophysics",
				"security",
				"fintech",
				"medicine",
				"machine learning",
				"software development",
				"biomedical devices",
			],
			your_interests: [
				"security",
				"fintech",
				"medicine",
				"machine learning",
				"software development",
				"biomedical devices",
			],
			skills: [],
			interests: [],
			filtered_catalog: [],
			in_filter: false,
			search_skills: true,
			search_interests: false,
			all_labs: this.props.labs,
			filtered_labs: []
		}
	}

	componentWillMount() {
		this.setState({filtered_catalog: this.state.skills_catalog});
  	}

  	componentDidMount() {
  		let temp_labs = this.state.all_labs;
  		temp_labs.map((lab) => {
  			lab.in_search = false;
  		});
  		this.setState({all_labs: temp_labs});

  		document.getElementById('lab-topic').addEventListener('click', () => document.getElementById('lab-search-box').classList.remove('hide'))
  		document.getElementById('lab-search').addEventListener("mouseleave", () => document.getElementById('lab-search-box').classList.add('hide'));

  	}

	filterList(event) {
		if (this.state.search_skills) {
			var updatedList = this.state.skills_catalog;
		}
		else {
			var updatedList = this.state.interests_catalog;
		}
    	updatedList = updatedList.filter(function(item){
      	return item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
        	event.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList, in_filter: true});
	}

	handleClickAdd(interest) {
		this.state.all_labs.map((lab) => {
			if (lab.tags.indexOf(interest) !== -1) {
				if (!lab.in_search) {
					let temp_lab = lab;
					temp_lab.in_search = true;
					this.setState((prevState) => {filtered_labs: prevState.filtered_labs.push(temp_lab)});
				}
			}
		});
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
		this.state.all_labs.map((lab) => {
			if (lab.tags.indexOf(interest) !== -1) {
				if (lab.in_search) {
					let temp_lab = lab;
					temp_lab.in_search = false;

					let temp_filtered_labs = this.state.filtered_labs;
					let indx = this.state.filtered_labs.indexOf(lab);
					temp_filtered_labs.splice(indx, 1);

					this.setState((prevState) => {filtered_labs: temp_filtered_labs});
				}
			}
		});
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
		let temporary = "default";
		if (document.getElementById('lab-topic')) {
			let len = document.getElementById('lab-topic').value.length;
			if (len != 0) {
				temporary = document.getElementById('lab-topic').value;
			}
		}
		if (event.target.value === 'skills') {
			this.setState((prevState) => {
				var updatedList = this.state.skills_catalog;
				if (temporary !== "default") {
			    	updatedList = updatedList.filter(function(item){
			      	return item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
			        	temporary.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
			    	});
				}
				else {
					updatedList = this.state.skills_catalog;
				}
				return {filtered_catalog: updatedList, 
						search_skills: true,
						search_interests: false,
						in_filter: true};
			});
		}
		else {
			this.setState((prevState) => {
				var updatedList = this.state.interests_catalog;
				if (temporary !== "default") {
			    	updatedList = updatedList.filter(function(item){
			      	return item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
			        	temporary.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
			    	});
				}
				else {
					updatedList = this.state.interests_catalog;
				}
				return {filtered_catalog: updatedList, 
						search_skills: false,
						search_interests: true,
						in_filter: true};
			});
		}
	}

	handleImport(import_type) {
		if (import_type === 'skills') {
			this.state.your_skills.map((skill) => {
				this.state.all_labs.map((lab) => {
					if (lab.tags.indexOf(skill) !== -1) {
						if (!lab.in_search) {
							let temp_lab = lab;
							temp_lab.in_search = true;
							this.setState((prevState) => {filtered_labs: prevState.filtered_labs.push(temp_lab)});
						}
					}
				});
			});
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
			this.state.your_interests.map((interest) => {
				this.state.all_labs.map((lab) => {
					if (lab.tags.indexOf(interest) !== -1) {
						if (!lab.in_search) {
							let temp_lab = lab;
							temp_lab.in_search = true;
							this.setState((prevState) => {filtered_labs: prevState.filtered_labs.push(temp_lab)});
						}
					}
				});
			});
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

	closeModifiers() {
		document.getElementById('lab-search-box').classList.add('hide');
	}

	render() {
		return (
			<div id='lab-search'>
				<div className='form labSearch shadow'>
					<div className='row'>
						<div className='col s12 m12 l2 left-align lab-search-label grey-text text-darken-1'>LAB SEARCH</div>
						<div className='col s12 m9 '><input id='lab-topic' className='lab-search-input' type='text' placeholder='keywords' onChange={this.filterList.bind(this)} /></div>
					</div>
				</div>

				<div id='lab-search-box' className='hide'>
					{/* These two radio butons are used to switch between searching for skills/interests */}

					{/* This container holds the list of skills/interests you can choose from,
						as well as the skills/interests that have been chosen already. This container should
						only show up when a user has their cursor clicked on the search */}
					<div className='row lab-search-modifiers'>
						<i className='material-icons close-modifiers' onClick={this.closeModifiers.bind(this)}>close</i>
						<div className='col s6 left-align'>
							<p className="fe-test">SEARCH BY</p>
							<input className="radio" name="user_type" type="radio" id="skills" value="skills" onChange={this.handleSearchType.bind(this)} required />
							<label htmlFor="skills">Skills</label>
							<input className="radio" name="user_type" type="radio" id="interests" value="interests" onChange={this.handleSearchType.bind(this)} required />
							<label htmlFor="interests">Interests</label>
						</div>
						<div className='col s6 import-container'>
							<p className="fe-test">IMPORT</p>
							<button className="btn waves-effect waves-light submit-btn import-btn"
			        			type="submit" 
			        			name="action"
			        			onClick={this.handleImport.bind(this, 'skills')}
			        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#eee', color: 'grey', letterSpacing: '2px'}}
			        		>Skills
			        		</button>
			        		<button className="btn waves-effect waves-light submit-btn import-btn"
			        			type="submit" 
			        			name="action"
			        			onClick={this.handleImport.bind(this, 'interests')}
			        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#eee', color: 'grey', letterSpacing: '2px'}}
			        		>Interests
			        		</button>
						</div>
					</div>

					<div className='row search-interest-container'>
						<div className='interest-section col s6 left-align'>
							<div className='interest-body'>
								{this.state.filtered_catalog.map((interest) => {
									return (<span key={interest} onClick={this.handleClickAdd.bind(this, interest)} > <Bubble txt={interest} type='adder' /> </span>)
								})}
							</div>
						</div>
						<div className='interest-section col s6'>
							<div className='interest-body'>
								<div className='selected-container'>
									<p> SKILLS </p>
									{this.state.skills.map((interest) => {
										return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, 'skill')} > <Bubble txt={interest} type='deleter' /> </span>)
									})}
								</div>

								<br></br>
								<br></br><br></br>
								<br></br>
								
								<div className='selected-container'>
									<p style={{display: 'block'}}> INTERESTS </p>
									{this.state.interests.map((interest) => {
										return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, 'interest')} > <Bubble txt={interest} type='deleter' /> </span>)
									})}
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className='row'>
					<LabList header="Lab Match" labs={this.state.filtered_labs} />	
				</div>
			</div>
		);
	}
}

export default LabSearch;