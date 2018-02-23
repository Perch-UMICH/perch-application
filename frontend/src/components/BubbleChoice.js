import React, {Component} from 'react';
import { parse } from 'query-string';
import SquareButton from './SquareButton';
import Bubble from './Bubble';
import './PickYourInterests.css';

class BubbleChoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: this.props.display_info.catalog,
			interests: this.props.display_info.interests,
			filtered_catalog: [],
			in_filter: false
		};
	}

	componentWillMount() {
    	this.setState({filtered_catalog: this.state.catalog});
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
		if (this.props.callbackSkills) {
			this.props.callbackSkills(this.state.interests);
		}
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
		if (this.props.callbackSkills) {
			this.props.callbackSkills(this.state.interests);
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

		return(
			<div className='row interest-container'>
				<div className='interest-section col s6 left-align'>
					<input id='lab-name' className='interest-search' type='text' placeholder={this.props.display_info.placeholder_txt} onChange={this.filterList.bind(this)} />
					<div className='interest-body'>
						{this.state.filtered_catalog.map((interest) => {
							return (<span key={interest} onClick={this.handleClickAdd.bind(this, interest, temporary)} > <Bubble txt={interest} type='adder' /> </span>)
						})}
					</div>
				</div>

				<div className='interest-section col s6'>
					<div className='interest-header'>
						{this.props.display_info.header_txt}
					</div>
					<div className='interest-body'>
						{this.state.interests.map((interest) => {
							return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, temporary)}> <Bubble txt={interest} type='deleter' /> </span>)
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default BubbleChoice;