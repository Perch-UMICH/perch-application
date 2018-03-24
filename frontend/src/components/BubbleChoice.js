import React, {Component} from 'react';
import Bubble from './Bubble';
import {getStudent, getLab, getAllTags, getAllSkills} from '../helper.js';
import $ from 'jquery';
import './PickYourInterests.css';

class BubbleChoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [],
			choices: [],
			filtered_catalog: [],
			in_filter: false
		};
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.props.display_info.req_type === 'tags') {
				getAllTags().then(resp => {
					console.log("TAGS?");
					console.log(resp);
					if (resp.result) {
						this.setState({ catalog: resp.result, filtered_catalog: resp.result });
					}
				}).then(resp => {
					this.setUserChoices();
				});
			} else {
				getAllSkills().then(resp => {
					console.log("skills?");
					console.log(resp);
					if (resp.result) {
						this.setState({ catalog: resp.result, filtered_catalog: resp.result });
					}
				}).then(resp => {
					this.setUserChoices();
				});
			}
		}, 200);
	}

	setUserChoices() {
		var temp_choices = [];
		if (this.props.display_info.user_type === 'student') {
			getStudent(this.props.display_info.user_id).then((resp) => {
				if (resp.result) {
					if (this.props.display_info.req_type === 'tags') {
						temp_choices = resp.tags;
					} else {
						temp_choices = resp.skills;
					}
					var temp_catalog = this.state.catalog;
					temp_catalog = temp_catalog.filter( function( elt ) {
					  return !temp_choices.includes( elt );
					});
				    this.setState({ 
				    	choices: temp_choices,
				    	catalog: temp_catalog,
				    }, () => {
				    	if (this.props.callbackSkills) {
				    		this.props.callbackSkills(temp_choices);
				    	}
				    });
				}
			});
		}
		else if (this.props.display_info.user_type === 'faculty') {
			getLab(this.props.display_info.user_id).then((resp) => {
				if (resp.result) {
					if (this.props.display_info.req_type === 'tags') {
						temp_choices = resp.tags;
					} else {
						temp_choices = resp.skills;
					}
					var temp_catalog = this.state.catalog;
					temp_catalog = temp_catalog.filter( function( elt ) {
					  return !temp_choices.includes( elt );
					});
				    this.setState({ 
				    	choices: temp_choices,
				    	catalog: temp_catalog,
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
    	this.setState({filtered_catalog: updatedList, search_term: event.target.value});
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
				<div className='interest-section col s6 left-align'>
					<input id='search-term' className='interest-search' type='text' placeholder={this.props.display_info.placeholder_txt} onChange={this.filterList.bind(this)} />
					<div className='interest-body'>
						{this.state.filtered_catalog.map((bubble) => {
							return (<span key={bubble.name} onClick={this.handleClickAdd.bind(this, bubble)} > <Bubble txt={bubble.name} type='adder' /> </span>)
						})}
					</div>
				</div>

				<div className='interest-section col s6'>
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