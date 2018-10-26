/* Lab Dashboard ('YOUR PROJECTS') page for both students and faculty
Students:
  -  Display saved projects
	-  Display projects that they've applied to

Faculty: (an idea)
  -  Display the projects that they own / have created
	-  Display applicants to their projects (THIS COULD DEFINITELY GO IN ANOTHER AREA)
*/

import React, {Component} from 'react';
import {getStudent, getLabPositionApplication, getLabPositionApplicationResponses} from '../../helper.js'
import './Applicants.css'

class Applicants extends Component {
	constructor(props) {
        super(props)
        console.log("APPLICANTS!?!?", this.props.applicants)
		this.state = {
            app_questions: [
                {
					id: 1,
					text: "Why are you interested in this project?",
				},
				{
					id: 2,
					text: "What makes you a good fit to work in our lab?",
				},
            ],
            applicants: [],
            namesMap: {}
		}
    }

	componentDidMount() {
		getLabPositionApplication(this.props.lab_id, this.props.pos_id).then(resp => {
            console.log("application qs", resp)
        })
        getLabPositionApplicationResponses(this.props.lab_id, this.props.pos_id).then(resp => {
			if (resp.data && resp.data.length) {
                this.setState({applicants: resp.data})
                let namesMap = {}
                resp.data.map(app => {
                    getStudent(app.student_id).then(r => {
                        if (r && r.data) {
                            namesMap[app.student_id] = r.data.first_name
                            this.setState({namesMap})
                        }
                    })
                })
            }
		})
	}

	render() {
		return (
            <div classname="applicants-container">
                {
                    this.state.applicants.map((app, index) => {
                        return(
                            <ApplicantContainer key={index} application={app} app_questions={this.state.app_questions} name={this.state.namesMap[app.student_id]}/>
                        )
                })}
                <br/><br/>
            </div>
	);
	}
}

const ApplicantContainer = (props) => {
    let app = props.application
	let project_action = <a href={`/student-profile/${app.student_id}`} target="_blank"><div className='applicant-cta'>View Profile</div></a>
    
    return (
        <div className='applicant-wrapper'>
            {project_action}
            <div className="applicant-name">{props.name}</div>
            <div className="applicant-descriptor"><i>Applied on {app.created_at && app.created_at.length && app.created_at.split(' ')[0]}</i></div>
            {props.app_questions.map((q, index) => {
                return (
                    <div key={index} className="app-response-container">
                        <div className="app-question-text"><b>{q.text}</b></div>
                        <div className="app-response-text">{app.answers[index].response}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Applicants;
