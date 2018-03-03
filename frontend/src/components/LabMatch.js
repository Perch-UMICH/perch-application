import React, {Component} from 'react';
import LabSearch from './LabSearch';
import LabList from './LabList';

class LabMatch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			labs: [
				{
					name: "The Infant Cognition Project",
					img: 'https://static1.squarespace.com/static/54693b1ee4b07c8a3da7b6d0/58df54aa1b10e31ed44dab4b/58df54ab6b8f5b410f59d285/1491031900534/Leap-Systems-2016-Headshots-By-Lamonte-G-Photography-IMG_1871-Edit.jpg',
					tags: [
						'neurosurgery',
						'materials',
						'physics',
					],
					profile_link: 'prof-page',
					spots: 2,
				},
				{
					name: "Joe's Oncology Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_L8P0FKjusRLjt6GL_tsSWV4PfVp97L9dUw3PfbNEufTGlWtPCg',
					tags: [
						'oncology',
						'cancer',
						'medicine',
					],
					profile_link: 'prof-page',
					spots: 4,
				},
				{
					name: "Susan's Pediatric Lab",
					img: 'http://csforum2013.com/wp-content/uploads/2013/04/kristina-headshot-square-624x609.png',
					tags: [
						'pediatrics',
						'children',
						'medicine',
					],
					profile_link: 'prof-page',
					spots: 3,
				},
				{
					name: "Mary's Astrophysics Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'astrophysics',
						'physics',
						'astronomy',
					],
					profile_link: 'prof-page',
					spots: 2,
				},
				{
					name: "Bo's Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'security',
						'fintech',
					],
					profile_link: 'prof-page',
					spots: 2,
				},
				{
					name: "Mo's Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'machine learning',
						'physics',
						'software development',
					],
					profile_link: 'prof-page',
					spots: 2,
				},
				{
					name: "Josephine's Astrophysics Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'virology',
						'medicine',
						'chemistry',
					],
					profile_link: 'prof-page',
					spots: 2,
				},
				{
					name: "Steve's Lab",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'biomedical devices',
						'medicine',
						'software development',
					],
					profile_link: 'prof-page',
					spots: 2,
				},
				
			]
		}
	}
	render() {
		return (
			<div className='shift-down container center-align'>
				<LabSearch labs={this.state.labs} />
			</div>
		);
	}
}

export default LabMatch;