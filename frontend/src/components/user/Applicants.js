/* Lab Dashboard ('YOUR PROJECTS') page for both students and faculty
Students:
  -  Display saved projects
	-  Display projects that they've applied to

Faculty: (an idea)
  -  Display the projects that they own / have created
	-  Display applicants to their projects (THIS COULD DEFINITELY GO IN ANOTHER AREA)
*/

import React, {Component} from 'react';
import {getCurrentUserId, getStudentFromUser, getFacultyFromUser, getLabPositionApplication, isFaculty} from '../../helper.js'

class Applicants extends Component {
	constructor(props) {
        super(props)
        console.log("APPLICANTS", this.props.applicants)
		this.state = {
			applicants: this.props.applicants || [],
		}
    }
    
    componentWillReceiveProps(props) {
        this.setState({applicants: props.applicants || this.state.applicants})
    }

	componentDidMount() {
		getLabPositionApplication(this.props.lab_id, this.props.pos_id).then(resp => {
            console.log("application qs", resp)
        })
	}

	render() {
        var facultyOwned = isFaculty();

		return (
            <div>
                {
                    this.state.applicants.map((application, index) => {
                        return(
                            <ApplicantContainer key={index} application={application}/>
                        )
                })}
            </div>
	);
	}
}

const ApplicantContainer = (props) => {
    console.log("APPLICATION!", props.application)
    let app = props.application
    return (
        <div> HI 
            {}
        </div>
    )
}

export default Applicants;
