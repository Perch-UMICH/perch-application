/**
 * Created by aksha on 7/22/2018.
 */
import React from 'react'
//import {getAllUsers, registerUser, updateUser, deleteUser, loginUser, verifyLogin, isLoggedIn, getCurrentUserId, isStudent, getAllStudents, getStudent, getStudentSkills, getStudentTags, getAllFaculties, getFaculty, createFaculty, logoutCurrentUser} from './helper'
import * as helper from './helper'


class UserTest extends React.Component {
    constructor() {

        super();

        this.state = {
            //getAllUsers_result: null,
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
            getAllFaculties_result: null,
            getFaculty_result: null,
            createFaculty_result: null,
        }
    }

    //R: func is a valid function and inputs is an array
    //E: assigns the response of the called function to a variable with that function's name
    testFactory(func, inputs) {
        func(...inputs).then((resp) => {
            let toReturn = {}
            toReturn[func.name] = JSON.stringify(resp, undefined, 2);
            this.setState(toReturn);
        });
    }

    componentDidMount() {

        // All axios requests are asynchronous, so you need to use the ".then" method to catch the eventual
        // return of the data.
        // All code within the .then block will not be parsed until a response has been receive (success or failure).
        // So, code outside the block cannot rely on data that's supposed to be returned, since you can't guarantee
        // that the data will be back

        // // Get all users
        // getAllUsers().then((resp) => {
        //     this.setState({getAllUsers_result: JSON.stringify(resp)});
        // });

        this.testFactory(helper.getAllUsers, []);

        // Register a user
        helper.registerUser('email','name@name.com','password','password').then((resp) => {
           this.setState({registerUser_result: JSON.stringify(resp)});

           // Then, Login the user
           helper.loginUser('name@name.com','password').then((resp) => {

               // Then, update user info
               helper.updateUser('update_name','update_email','update_password','update_password').then((resp) => {
                   this.setState({updateUser_result: JSON.stringify(resp)});

                   //Then, verify login
                   helper.verifyLogin().then((resp) => {
                    this.setState({verifyLong_result: JSON.stringify(resp)});

                        // Then, delete the user
                       helper. deleteUser().then((resp) => {
                            this.setState({deleteUser_result: JSON.stringify(resp)});

                            //Then, check userId() 
                            this.setState({userId_result: helper.getCurrentUserId()});

                            //Then, checked if the user is logged in (they shouldn't be)
                            this.setState({isLoggedIn_result: helper.isLoggedIn().toString});
                        });
                    });
                });
            });
        });

        helper.getAllStudents().then((resp) => {
            this.setState({getAllStudents_result: JSON.stringify(resp)});
        });

        helper.getStudent(4).then((resp) => {
            this.setState({getStudentFour_result: JSON.stringify(resp)});
        });

        //Expecting an error
        helper.getStudent(4000000).then((resp) => {
            this.setState({getStudentFourMil_result: JSON.stringify(resp)});
        });

        helper.getStudentSkills(4).then((resp) => {
            this.setState({getStudentSkills_result: JSON.stringify(resp)});
        });

        helper.getStudentTags(4).then((resp) => {
            this.setState({getStudentTags_result: JSON.stringify(resp)});
        });

        //Test registering a user with identical parameters
        helper.logoutCurrentUser().then(
            console.log('Logging out'),
            helper.loginUser('waldo@missing.com', 'where').then(
                console.log('Loggin Waldo in'),
                helper.deleteUser().then(
                    console.log('Deleteing Waldo'),
                    this.testFactory(helper.registerUser, ['Waldo', 'waldo@missing.com', 'where', 'where'])
                )
            )
        )

        //Faculty Tests
        helper.getAllFaculties().then((resp) => {
            this.setState({getAllFaculties_result: JSON.stringify(resp)});
        });

        helper.getFaculty(1).then((resp) => {
            this.setState({getFaculty_result: JSON.stringify(resp)});
        });

        helper.createFaculty(10, 'Akshay', 'Rao', 'PhD', 'akshayro@umich.edu').then((resp) => {
            this.setState({createFaculty_result: JSON.stringify(resp)});
        });

    }


    render() {
        return(
            <div id='test'>
                <h1>Student Tests</h1>
                <h2>getAllUsers</h2>
                <pre>{this.state.getAllUsers}</pre>
                <h2>registerUser</h2>
                <pre>{this.state.registerUser_result}</pre>
                <h2>updateUser</h2>
                <pre>{this.state.updateUser_result}</pre>
                <h2>verifyLogin</h2>
                <pre>{this.state.verifyLong_result}</pre>
                <h2>deleteUser</h2>
                <pre>{this.state.deleteUser_result}</pre>
                <h2>getCurrentUserId</h2>
                <pre>{this.state.userId_result}</pre>
                <h2>isLoggedIn</h2>
                <pre>{this.state.isLoggedIn_result}</pre>
                <h2>getAllStudents</h2>
                <pre>{this.state.getAllStudents_result}</pre>
                <h2>getStudent(4)</h2>
                <pre>{this.state.getStudentFour_result}</pre>
                <h2>getStudent(4000000)</h2>
                <pre>{this.state.getStudentFourMil_result}</pre>
                <h2>getStudentSkills</h2>
                <pre>{this.state.getStudentSkills_result}</pre>
                <h2>getStudentTags</h2>
                <pre>{this.state.getStudentTags_result}</pre>
                <h1>Regeistration Overlap Tests</h1>
                <h2>Original User</h2>
                <pre>{this.state.registerUser}</pre>

                <h1>Faculty Tests</h1>
                <h2>getAllFaculties</h2>
                <pre>{this.state.getAllFaculties_result}</pre>
                <h2>getFaculty(1)</h2>
                <pre>{this.state.getFaculty_result}</pre>
                <h2>createFaculty</h2>
                <pre>{this.state.createFaculty_result}</pre>

            </div>
        )
    }
}

export default UserTest