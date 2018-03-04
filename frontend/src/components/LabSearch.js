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
  			lab.tags_in = 0;
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

	handleClickAdd(interest, temporary) {
		this.state.all_labs.map((lab) => {
            if (lab.tags.indexOf(interest) !== -1) {
                if (!lab.in_search) {
                    let temp_lab = lab;
                    temp_lab.in_search = true;
                    temp_lab.tags_in++;
                    this.setState((prevState) => {filtered_labs: prevState.filtered_labs.push(temp_lab)});
                }
                else {
                    let temp_lab = lab;
                    temp_lab.tags_in++;
                }
            }
        });
        this.setState((prevState) => {
            if (this.state.search_skills) {
                let temp_delete = prevState.skills_catalog;
                let temp_filter = prevState.filtered_catalog;
                temp_delete.splice(temp_delete.indexOf(interest), 1);

                if (temporary != "default") {
                    temp_filter.splice(temp_filter.indexOf(interest), 1);
                }
                else if (this.state.in_filter) {
                    temp_filter.splice(temp_filter.indexOf(interest), 1);
                }

                let temp_add = prevState.skills;
                    temp_add.push(interest);
                    return {skills: temp_add, skills_catalog: temp_delete, filtered_catalog: temp_filter};
            }
            else {
                let temp_delete = prevState.interests_catalog;
                let temp_filter = prevState.filtered_catalog;
                temp_delete.splice(temp_delete.indexOf(interest), 1);

                if (temporary != "default") {
                    temp_filter.splice(temp_filter.indexOf(interest), 1);
                }
                else if (this.state.in_filter) {
                    temp_filter.splice(temp_filter.indexOf(interest), 1);
                }
                let temp_add = prevState.interests;
                    temp_add.push(interest);
                    return {interests: temp_add, interests_catalog: temp_delete, filtered_catalog: temp_filter};
            }
        });
	}

	handleClickDelete(interest, type, temporary) {
		this.state.all_labs.map((lab) => {
            if (lab.tags.indexOf(interest) !== -1) {
                if (lab.in_search && (lab.tags_in === 1)) {
                    let temp_lab = lab;
                    temp_lab.in_search = false;
                    temp_lab.tags_in--;

                    let temp_filtered_labs = this.state.filtered_labs;
                    let indx = this.state.filtered_labs.indexOf(lab);
                    temp_filtered_labs.splice(indx, 1);

                    this.setState((prevState) => {filtered_labs: temp_filtered_labs});
                }
                else {
                    lab.tags_in--;
                }
            }
        });
        this.setState((prevState) => {
            if (type === 'skill') {
                var temp_delete = prevState.skills;
                var temp_add = prevState.skills_catalog;
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
                
                if (prevState.search_interests) {
                    return {skills: temp_delete, skills_catalog: temp_add, filtered_catalog: temp_filter};
                }
                else {
                    return {skills: temp_delete, skills_catalog: temp_add};
                }
            }
            else {
                var temp_delete = prevState.interests;
                var temp_add = prevState.interests_catalog;
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
                
                if (prevState.search_skills) {
                    return {interests: temp_delete, interests_catalog: temp_add, filtered_catalog: temp_filter};
                }
                else {
                    return {interests: temp_delete, interests_catalog: temp_add};
                }
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
						search_interests: false};
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
						search_interests: true};
			});
		}
	}

	handleImport(import_type, temporary) {
		if (import_type === 'skills') {
            this.state.your_skills.map((skill) => {
                this.state.all_labs.map((lab) => {
                    if (lab.tags.indexOf(skill) !== -1) {
                        if (!lab.in_search) {
                            let temp_lab = lab;
                            temp_lab.in_search = true;
                            temp_lab.tags_in++;
                            this.setState((prevState) => {filtered_labs: prevState.filtered_labs.push(temp_lab)});
                        }
                        else {
                            lab.tags_in++;
                            console.log(lab.tags_in);
                        }
                    }
                });
            });
            this.setState((prevState, import_type) => {
                let temp_delete = prevState.skills_catalog;
                let temp_filter = prevState.filtered_catalog;
                let temp_add = prevState.skills;

                prevState.your_skills.map((skill) => {
                    if (temp_delete.indexOf(skill) !== -1) {
                        temp_delete.splice(temp_delete.indexOf(skill), 1);
                    }
                    if ((temporary != "default") && (temp_filter.indexOf(skill) != -1)) {
                        temp_filter.splice(temp_filter.indexOf(skill), 1);
                    }
                    else if (this.state.in_filter && (temp_filter.indexOf(skill) != -1)) {
                        temp_filter.splice(temp_filter.indexOf(skill), 1);
                    }

                    if (prevState.skills.indexOf(skill) === -1) {
                        temp_add.push(skill);
                    }
                });
                return {skills: temp_add, skills_catalog: temp_delete, filtered_catalog: temp_filter};
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
                let temp_delete = prevState.interests_catalog;
                let temp_filter = prevState.filtered_catalog;
                let temp_add = prevState.interests;

                prevState.your_interests.map((interest) => {
                    if (temp_delete.indexOf(interest) !== -1) {
                        temp_delete.splice(temp_delete.indexOf(interest), 1);
                    }
                    if ((temporary != "default") && (temp_filter.indexOf(interest) != -1)) {
                        temp_filter.splice(temp_filter.indexOf(interest), 1);
                    }
                    else if (this.state.in_filter && (temp_filter.indexOf(interest) != -1)) {
                        temp_filter.splice(temp_filter.indexOf(interest), 1);
                    }

                    if (prevState.interests.indexOf(interest) === -1) {
                        temp_add.push(interest);
                    }
                });
                return {interests: temp_add, interests_catalog: temp_delete, filtered_catalog: temp_filter};
            });
        }
	}

	closeModifiers() {
		document.getElementById('lab-search-box').classList.add('hide');
	}

	render() {
		let temporary = "default";
        if (document.getElementById('lab-topic')) {
            let len = document.getElementById('lab-topic').value.length;
            if (len != 0) {
                temporary = document.getElementById('lab-topic').value;
            }
        }
		return (
			<div id='lab-search'>
				<div className='form labSearch shadow'>
					<div className='row'>
						{/*<div className='col s12 m12 l2 left-align lab-search-label grey-text text-darken-1'>LAB SEARCH</div>*/}
						<div className='col s12'><input id='lab-topic' className='lab-search-input' type='text' placeholder='keywords' onChange={this.filterList.bind(this)} /></div>
					</div>
				</div>

				<div id='lab-search-box' className='hide'>
					<div className='row lab-search-modifiers'>
						<i className='material-icons close-modifiers' onClick={this.closeModifiers.bind(this)}>close</i>
						<div className='col s6 left-align'>
							<p className="fe-test">SEARCH BY</p>
							<input className="radio" name="user_type" type="radio" id="skills" value="skills" checked={this.state.search_skills} onChange={this.handleSearchType.bind(this)} required />
							<label htmlFor="skills">Skills</label>
							<input className="radio" name="user_type" type="radio" id="interests" value="interests" onChange={this.handleSearchType.bind(this)} required />
							<label htmlFor="interests">Interests</label>
						</div>
						<div className='col s6 import-container'>
							<p className="fe-test">IMPORT</p>
							<button className="btn waves-effect waves-light submit-btn import-btn"
			        			type="submit" 
			        			name="action"
			        			onClick={this.handleImport.bind(this, 'skills', temporary)}
			        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#eee', color: 'grey', letterSpacing: '2px'}}
			        		>Skills
			        		</button>
			        		<button className="btn waves-effect waves-light submit-btn import-btn"
			        			type="submit" 
			        			name="action"
			        			onClick={this.handleImport.bind(this, 'interests', temporary)}
			        			style={{marginTop: '0px', marginLeft: '15px', backgroundColor: '#eee', color: 'grey', letterSpacing: '2px'}}
			        		>Interests
			        		</button>
						</div>
					</div>

					<div className='row search-interest-container'>
						<div className='interest-section search-interest-section-left col s6 left-align'>
							<div className='interest-body'>
								{this.state.filtered_catalog.map((interest) => {
									return (<span key={interest} onClick={this.handleClickAdd.bind(this, interest, temporary)} > <Bubble txt={interest} type='adder' /> </span>)
								})}
							</div>
						</div>
						<div className='interest-section search-interest-section-right col s6'>
							<div className='interest-body'>
								<div className='selected-container'>
									<p> SKILLS </p>
									{this.state.skills.map((interest) => {
										return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, 'skill', temporary)} > <Bubble txt={interest} type='deleter' /> </span>)
									})}
								</div>

								<br></br>
								<br></br><br></br>
								<br></br>
								
								<div className='selected-container'>
									<p style={{display: 'block'}}> INTERESTS </p>
									{this.state.interests.map((interest) => {
										return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, 'interest', temporary)} > <Bubble txt={interest} type='deleter' /> </span>)
									})}
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className='row'>
					<LabList labs={this.state.filtered_labs} />	
				</div>
			</div>
		);
	}
}

export default LabSearch;