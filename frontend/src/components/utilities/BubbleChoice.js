import React, {Component} from 'react';
import Bubble from './Bubble';
import {getStudent, getLab, getAllTags, getAllSkills, getCurrentStudentId, getCurrentLabId} from '../../helper.js';
import $ from 'jquery';
import '../user/individual/PickYourInterests.css';

class BubbleChoice extends Component {
	constructor(props) {
		super(props);
		var tempIntCat = [{name: 'biology'}, {name: 'chemisty'}, {name: 'spoon making'}, {name: 'cross origin analysis'}, {name: 'grossly overpriced cheese'}];
		var tempIntFiltCat = [{name: 'biology'}, {name: 'chemisty'}, {name: 'spoon making'}, {name: 'cross origin analysis'}, {name: 'grossly overpriced cheese'}];
		var tempSkillCat = [{name: 'HTML'}, {name: 'CSS'}, {name: 'React'}, {name: 'patience'}, {name: 'typing with fingers'}, {name: 'thinking with brain'}];
		var tempSkillFiltCat = [{name: 'HTML'}, {name: 'CSS'}, {name: 'React'}, {name: 'patience'}, {name: 'typing with fingers'}, {name: 'thinking with brain'}];
		var tempCat = props.skills ? tempSkillCat : tempIntCat;
		var tempFiltCat = props.skills ? tempSkillFiltCat : tempIntFiltCat;

		this.state = {
			catalog: tempCat,
			choices: [],
			filtered_catalog: tempFiltCat,
			in_filter: false
		};
	}

	componentDidMount() {
		/* None of this works
		setTimeout(() => {
			if (this.props.display_info.req_type === 'tags') {
				getAllTags().then(resp => {
					if (resp.result) {
						this.setState({ catalog: resp.result, filtered_catalog: resp.result.slice() });
					}
				}).then(resp => {
					this.setUserChoices();
				});
			} else {
				getAllSkills().then(resp => {
					if (resp.result) {
						this.setState({ catalog: resp.result, filtered_catalog: resp.result.slice() });
					}
				}).then(resp => {
					this.setUserChoices();
				});
			}
		}, 200);*/
	}

	setUserChoices() {
		var temp_choices = [];
		if (this.props.display_info.user_type === 'student') {
			getStudent(getCurrentStudentId()).then((resp) => {
				if (resp) {
					if (this.props.display_info.req_type === 'tags') {
						temp_choices = resp.tags;
					} else {
						temp_choices = resp.skills;
					}
					var temp_catalog = this.state.catalog;
				  temp_choices = temp_choices ? temp_choices : [];
					/*temp_catalog = temp_catalog.filter( function( elt ) {
					  return !temp_choices.includes( elt );
					});*/
					var updated_catalog = [];
					for (var i = 0; i < temp_catalog.length; ++i) {
						var inChoices = false;
						for (var j = 0; j < temp_choices.length; ++j) {
							if (temp_catalog[i].id === temp_choices[j].id) {
								inChoices = true;
								break;
							}
						}
						if (!inChoices) {
							updated_catalog.push(temp_catalog[i]);
						}
					}
				    this.setState({
				    	choices: temp_choices,
				    	catalog: updated_catalog,
				    	filtered_catalog: updated_catalog.slice(),
				    }, () => {
				    	if (this.props.callbackSkills) {
				    		this.props.callbackSkills(temp_choices);
				    	}
				    });
				}
			});
		}
		else if (this.props.display_info.user_type === 'faculty') {
			getLab(getCurrentLabId()).then((resp) => {
				if (resp) {
					if (this.props.display_info.req_type === 'tags') {
						temp_choices = resp.tags;
					} else {
						temp_choices = resp.skills;
					}
					var temp_catalog = this.state.catalog;
					temp_choices = temp_choices ? temp_choices : [];
					/*
					temp_catalog = temp_catalog.filter( function( elt ) {
					  return !temp_choices.includes( elt );
					});*/
					var updated_catalog = [];
					for (var i = 0; i < temp_catalog.length; ++i) {
						var inChoices = false;
						for (var j = 0; j < temp_choices.length; ++j) {
							if (temp_catalog[i].id === temp_choices[j].id) {
								inChoices = true;
								break;
							}
						}
						if (!inChoices) {
							updated_catalog.push(temp_catalog[i]);
						}
					}
				    this.setState({
				    	choices: temp_choices,
				    	catalog: updated_catalog,
				    	filtered_catalog: updated_catalog.slice(),
				    }, () => {
				    	if (this.props.callbackSkills) {
				    		this.props.callbackSkills(temp_choices);
				    	}
				    });
				}
			});
		}
	}

	filterList(event) {
		var updatedList = this.state.catalog;
    	updatedList = updatedList.filter(function(item) {
	      	return item.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
	        	event.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList.slice(), search_term: event.target.value});
    	if (event.target.value) {
    		this.setState({in_filter: true });
    	} else {
    		this.setState({in_filter: false });
    	}
	}

	handleClickAdd(bubble) {
		this.setState((prevState) => {
			var temp_add = prevState.choices;
			var temp_delete = prevState.catalog;
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(bubble);
			temp_delete.splice(temp_delete.indexOf(bubble), 1);
			temp_filter.splice(temp_filter.indexOf(bubble), 1);

			return {catalog: temp_delete, choices: temp_add, filtered_catalog: temp_filter};
		}, () => {
			if (this.props.callbackSkills) {
				this.props.callbackSkills(this.state.choices);
			}
		});
	}

	handleClickDelete(bubble) {
		this.setState((prevState) => {
			var temp_delete = prevState.choices;
			var temp_add = prevState.catalog;
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(bubble);
			temp_delete.splice(temp_delete.indexOf(bubble), 1);

			if (this.state.search_term) {
				if (bubble.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
	        	this.state.search_term.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1) {
					temp_filter.push(bubble);
	        	}
			} else {
				temp_filter.push(bubble);
			}

			return {catalog: temp_add, choices: temp_delete, filtered_catalog: temp_filter};
		}, () => {
			if (this.props.callbackSkills) {
				this.props.callbackSkills(this.state.choices);
			}
		});
	}

	render() {
		return(
			<div className='row interest-container'>
				<div className='interest-section left col s6 left-align'>
					<input id='search-term' className='interest-search' type='text' placeholder={this.props.display_info.placeholder_txt} onChange={this.filterList.bind(this)} />
					<div className='interest-body'>
						{this.state.filtered_catalog.map((bubble) => {
							return (<span key={bubble.name} onClick={this.handleClickAdd.bind(this, bubble)} > <Bubble txt={bubble.name} type='adder' /> </span>)
						})}
					</div>
				</div>

				<div className='interest-section right col s6'>
					<div className='interest-header'>
						{this.props.display_info.header_txt}
					</div>
					<div className='interest-body'>
						{this.state.choices.map((bubble) => {
							return (<span key={bubble.name} onClick={this.handleClickDelete.bind(this, bubble)}> <Bubble txt={bubble.name} type='deleter' /> </span>)
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default BubbleChoice;
