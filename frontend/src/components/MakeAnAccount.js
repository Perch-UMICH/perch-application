import React, {Component} from 'react';
import SquareButton from './SquareButton'
import Bubble from './Bubble'
import './MakeAnAccount.css'
class MakeAnAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [
				"security",
				"fintech",
				"machine learning",
				"software development",
				"biomedical devices",
				"oncology",
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
			]
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		alert('hi')
	}

	render() {
		return(
			<div className='make-an-account shift-down container center-align'>
				<div className='row interest-container'>

					<div className='interest-section col s6 left-align'>
						<input id='lab-name' className='interest-search' type='text' placeholder='field of interest' />
						<div className='interest-body'>
							{this.state.catalog.map((interest) => {
								return (<Bubble txt={interest} type='adder' />)
							})}
						</div>
					</div>

					<div className='interest-section col s6'>
						<div className='interest-header'>
							Your Interests
						</div>
						<div className='interest-body'>
							<Bubble txt='security' type='deleter'/>
							<Bubble txt='fintech' type='deleter'/>
							<Bubble txt='machine learning' type='deleter'/>
							<Bubble txt='software development' type='deleter'/>
							<Bubble txt='biomedical devices' type='deleter'/>
						</div>
					</div>
				</div>
				<SquareButton destination='#' label='next'/>
			</div>
		);
	}
}

export default MakeAnAccount;