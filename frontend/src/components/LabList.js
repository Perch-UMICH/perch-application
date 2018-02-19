import React, {Component} from 'react';
import LabListItem from './LabListItem';
import './LabList.css';
class LabList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			labs: [
				{
					name: "Benji's Neurosurgery Lab",
					img: 'https://static1.squarespace.com/static/54693b1ee4b07c8a3da7b6d0/58df54aa1b10e31ed44dab4b/58df54ab6b8f5b410f59d285/1491031900534/Leap-Systems-2016-Headshots-By-Lamonte-G-Photography-IMG_1871-Edit.jpg',
					tags: [
						'neurosurgery',
						'materials',
						'physics',
					]
				},
				{
					name: "Joe's Oncology Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_L8P0FKjusRLjt6GL_tsSWV4PfVp97L9dUw3PfbNEufTGlWtPCg',
					tags: [
						'oncology',
						'cancer',
						'medicine',
					]
				},
				{
					name: "Susan's Pediatric Lab",
					img: 'http://csforum2013.com/wp-content/uploads/2013/04/kristina-headshot-square-624x609.png',
					tags: [
						'pediatrics',
						'children',
						'medicine',
					]
				},
				{
					name: "Mary's Astrophysics Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'astrophysics',
						'physics',
						'astronomy',
					]
				},
				
			]
		}
	}

	render() {
		return (
		<div className='col s12'>
			<div className='col s12 lab-list shadow' >
				<div className='lab-list-header white-text'>{this.props.header}</div>
				{this.state.labs.map((lab) => <LabListItem img={lab.img} labName={lab.name} tags={lab.tags}/>)}
			</div>
		</div>
		);
	}
}

export default LabList;