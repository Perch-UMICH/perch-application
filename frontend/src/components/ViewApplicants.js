import React, {Component} from 'react';
import StudentListItem from './StudentListItem';
import './LabList.css';
import {getLabPosition} from '../helper.js';

class ViewApplicants extends Component {
	constructor(props) {
		super(props);
		this.state = {
			applicants: [
				{
					name: "Joe Schmo",
					slug: "joe-schmo",
					img: 'https://static1.squarespace.com/static/54693b1ee4b07c8a3da7b6d0/58df54aa1b10e31ed44dab4b/58df54ab6b8f5b410f59d285/1491031900534/Leap-Systems-2016-Headshots-By-Lamonte-G-Photography-IMG_1871-Edit.jpg',
					tags: [
						'MatLab',
						'React.js',
						'A+ Humor',
					],
					profile_link: '/student-profile/joe-schmo'
				},
				{
					name: "Cool Student 87",
					slug: "cool-student-87",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_L8P0FKjusRLjt6GL_tsSWV4PfVp97L9dUw3PfbNEufTGlWtPCg',
					tags: [
						'pencil-sharpening',
						'spectography',
						'kind eyes',
					],
					profile_link: '/student-profile/cool-student-87'
				},
				{
					name: "Susan Salmon",
					slug: "susan-salmon",
					img: 'http://csforum2013.com/wp-content/uploads/2013/04/kristina-headshot-square-624x609.png',
					tags: [
						'plating',
						'planking',
						'planting',
					],
					profile_link: '/student-profile/susan-salmon'
				},
				{
					name: "Mary Modal",
					slug: "mary-modal",
					img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtlIs7sEURBC_LR2LM9_Fapi8onFUZt5WPUo9OIS040TGww7QY',
					tags: [
						'something',
						'physics',
						'astronomy',
					],
					profile_link: '/student-profile/mary-modal'
				},
			]
		};
	}

	componentDidMount() {
		var url_arr = window.location.pathname.split('/');
		var position_id = url_arr[2];
		getLabPosition(position_id).then(position => {
			console.log('position!');
			console.log(position);
			this.setState({ 
				pos_name: position.title,
			})
		});
		/*
		getPositionApplicants(position_id).then(resp => {
			this.setState({ applicants: resp.applicants });
		});*/
	}

	render() {
		return (
			<div className='shift-down container center-align'>
				<div className='row'>
					<div className='col s12'>
						<div className='col s12 lab-list shadow' >
							<div className='lab-list-header white-text'>{this.state.pos_name} Applicants</div>
							{this.state.applicants.map((app) => <StudentListItem key={app.name} img={app.img} name={app.name} tags={app.tags} dest={app.profile_link} slug={app.slug}/>)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewApplicants;