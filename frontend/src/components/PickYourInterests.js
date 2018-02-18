import React, {Component} from 'react';
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
		this.filterList = this.filterList.bind(this);
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
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);
			temp_filter.splice(temp_filter.indexOf(interest), 1);

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

			if (interest.includes(temporary.toString())) {
				temp_filter.push(interest);
			}

			return {catalog: temp_add, interests: temp_delete, filtered_catalog: temp_filter};
		});
	}

	render() {
		let temporary = "";
		if (document.getElementById('lab-name')) {
			temporary = document.getElementById('lab-name').value;
		}
		return(
			<div className='pick-your-interests shift-down container center-align'>
				<div className='row interest-container'>

					<div className='interest-section col s6 left-align'>
						<input id='lab-name' className='interest-search' type='text' placeholder='field of interest' onChange={this.filterList} />
						<div className='interest-body'>
							{this.state.filtered_catalog.map((interest) => {
								return (<span onClick={this.handleClickAdd.bind(this, interest)} > <Bubble txt={interest} type='adder' /> </span>)
							})}
						</div>
					</div>

					<div className='interest-section col s6'>
						<div className='interest-header'>
							Your Interests
						</div>
						<div className='interest-body'>
							{this.state.interests.map((interest) => {
								return (<span onClick={this.handleClickDelete.bind(this, interest, temporary)}> <Bubble txt={interest} type='deleter' /> </span>)
							})}
						</div>
					</div>
				</div>
				<SquareButton destination='past-research' label='next'/>
			</div>
		);
	}
}

export default PickYourInterests;