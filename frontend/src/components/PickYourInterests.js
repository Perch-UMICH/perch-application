import React, {Component} from 'react';
import { parse } from 'query-string';
import SquareButton from './SquareButton'
import Bubble from './Bubble'
import './PickYourInterests.css'
class PickYourInterests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [
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

			filtered_catalog: []
		};
	}

	componentWillMount() {
    	this.setState({filtered_catalog: this.state.catalog})
  	}

	filterList(event) {
		var updatedList = this.state.catalog;
    	updatedList = updatedList.filter(function(item){
      	return item.toLowerCase().search(
        	event.target.value.toLowerCase()) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList});
	}

	handleClickAdd(interest) {
		this.setState((prevState) => {
			var temp_add = prevState.interests;
			var temp_delete = prevState.catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			return {catalog: temp_delete, interests: temp_add};
		});
	}

	handleClickDelete(interest) {
		this.setState((prevState) => {
			var temp_delete = prevState.interests;
			var temp_add = prevState.catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			return {catalog: temp_add, interests: temp_delete};
		});
	}

	render() {
		var header_txt, placeholder_txt, dest = "";
		var user_type = parse(this.props.location.search).user_type;

		if (user_type === "faculty") {
			header_txt = "Your Lab Labels";
			dest = 'lab-website';
			placeholder_txt = "descriptors for your lab work";
		} 
		else if (user_type === "student") {
			header_txt = "Your Interests";
			placeholder_txt = "field of interest";
			dest = 'past-research';
		}

		return(
			<div className='pick-your-interests shift-down container center-align'>
				<div className='row interest-container'>
					<div className='interest-section col s6 left-align'>
						<input id='lab-name' className='interest-search' type='text' placeholder={placeholder_txt} onChange={this.filterList.bind(this)} />
						<div className='interest-body'>
							{this.state.filtered_catalog.map((interest) => {
								return (<span onClick={this.handleClickAdd.bind(this, interest)} > <Bubble txt={interest} type='adder' /> </span>)
							})}
						</div>
					</div>

					<div className='interest-section col s6'>
						<div className='interest-header'>
							{header_txt}
						</div>
						<div className='interest-body'>
							{this.state.interests.map((interest) => {
								return (<span onClick={this.handleClickDelete.bind(this, interest)}> <Bubble txt={interest} type='deleter' /> </span>)
							})}
						</div>
					</div>
				</div>
				<SquareButton destination={dest} label='next'/>
			</div>
		);
	}
}

export default PickYourInterests;