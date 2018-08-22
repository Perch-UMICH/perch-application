/**
 * Created by aksha on 7/22/2018.
 */
import React from 'react'
import {getAllUsers, registerUser, updateUser, deleteUser, loginUser, verifyLogin, isLoggedIn, getCurrentUserId, isStudent, getAllStudents, getStudent, getStudentSkills, getStudentTags} from './helper'

class UserTest extends React.Component {
    constructor() {

        super();

        this.state = {
            getAllUsers_result: null,
            getUser_result: null,
            registerUser_result: null,
            updateUser_result: null,
            deleteUser_result: null,
            verifyLong_result: null,
            isLoggedIn_result: null,
            userId_result: null,
            isStudent_result: null,
            getAllStudents_result: null,
            getStudentFour_result: null,
            getStudentFourMil_result: null,
            getStudentSkills_result: null,
            getStudentTags_result: null,
        }
    }

    componentDidMount() {
        let comp = this;

        // All axios requests are asynchronous, so you need to use the ".then" method to catch the eventual
        // return of the data.
        // All code within the .then block will not be parsed until a response has been receive (success or failure).
        // So, code outside the block cannot rely on data that's supposed to be returned, since you can't guarantee
        // that the data will be back

        // Get all users
        getAllUsers().then(function (resp) {
            comp.setState({getAllUsers_result: JSON.stringify(resp)});
        });

        // Register a user
        registerUser('name@name.com','email','password','password').then(function (resp) {
           comp.setState({registerUser_result: JSON.stringify(resp)});

           // Then, Login the user
           loginUser('email','password').then(function (resp) {

               // Then, update user info
               updateUser('update_name','update_email','update_password','update_password').then(function (resp) {
                   comp.setState({updateUser_result: JSON.stringify(resp)});

                   //Then, verify login
                   verifyLogin().then(function (resp) {
                    comp.setState({verifyLong_result: JSON.stringify(resp)});

                        // Then, delete the user
                        deleteUser().then(function (resp) {
                            comp.setState({deleteUser_result: JSON.stringify(resp)});

                            //Then, check userId() 
                            comp.setState({userId_result: getCurrentUserId()});

                            //Then, checked if the user is logged in (they shouldn't be)
                            comp.setState({isLoggedIn_result: isLoggedIn().toString});
                        });
                    });
                });
            });
        });

        getAllStudents().then(function (resp) {
            comp.setState({getAllStudents_result: JSON.stringify(resp)});
        });

        getStudent(4).then(function (resp) {
            comp.setState({getStudentFour_result: JSON.stringify(resp)});
        });

        //Expecting an error
        getStudent(4000000).then(function (resp) {
            comp.setState({getStudentFourMil_result: JSON.stringify(resp)});
        });

        getStudentSkills(4).then(function (resp) {
            comp.setState({getStudentSkills_result: JSON.stringify(resp)});
        });

        getStudentTags(4).then(function (resp) {
            comp.setState({getStudentTags_result: JSON.stringify(resp)});
        });

    }


    render() {
        return(
            <div>
                <h1>User Tests</h1>
                <h2>getAllUsers</h2>
                <p>{this.state.getAllUsers_result}</p>
                <h2>registerUser</h2>
                <p>{this.state.registerUser_result}</p>
                <h2>updateUser</h2>
                <p>{this.state.updateUser_result}</p>
                <h2>verifyLogin</h2>
                <p>{this.state.verifyLong_result}</p>
                <h2>deleteUser</h2>
                <p>{this.state.deleteUser_result}</p>
                <h2>getCurrentUserId</h2>
                <p>{this.state.userId_result}</p>
                <h2>isLoggedIn</h2>
                <p>{this.state.isLoggedIn_result}</p>
                <h2>getAllStudents</h2>
                <p>{this.state.getAllStudents_result}</p>
                <h2>getStudent(4)</h2>
                <p>{this.state.getStudentFour_result}</p>
                <h2>getStudent(4000000)</h2>
                <p>{this.state.getStudentFourMil_result}</p>
                <h2>getStudentSkills</h2>
                <p>{this.state.getStudentSkills_result}</p>
                <h2>getStudentTags</h2>
                <p>{this.state.getStudentTags_result}</p>
            </div>
        )
    }
}

export default UserTest