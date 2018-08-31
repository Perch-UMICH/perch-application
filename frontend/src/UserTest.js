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

    //R: func is a valid function and inputs is an array. Cannot be called on a function that returns null
    //E: Assigns the response of the called function to a variable with that function's name
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

        // Get all users
        this.testFactory(helper.getAllUsers, [])

        helper.logoutCurrentUser()
            .then(r => helper.loginUser('name@name.com','password'))
            .then(r => helper.deleteUser())
            .then(r => helper.loginUser('update_email', 'update_password'))
            .then(r => helper.deleteUser())

        //Simple registering and loging in a user test.
        this.testFactory(helper.registerUser, ['email','name@name.com','password','password'])
        this.testFactory(helper.loginUser, ['name@name.com','password'])
        this.testFactory(helper.updateUser, ['update_name','update_email@name.com', 'password', '1', '0'])
        this.testFactory(helper.verifyLogin, [])
        this.testFactory(helper.deleteUser, [])
        //These should throw errors, since no user should be logged in. Update, they throw the wrong kind of errors
        //this.testFactory(helper.getCurrentUserId, [])
        //this.testFactory(helper.isLoggedIn, [])

        this.testFactory(helper.getAllStudents, [])

        this.testFactory(helper.getStudent, [4])

        this.testFactory(helper.getStudentSkills, [4])

        helper.logoutCurrentUser()
            .then(r => helper.loginUser('waldo@missing.com', 'where'))
            .then(r => helper.deleteUser())
            .then(r => helper.registerUser('Waldo', 'waldo@missing.com', 'where', 'where'))
            .then(r => helper.loginUser('waldo@missing.com', 'where'))
            .then(r => helper.deleteUser())


        //Faculty Tests
        this.testFactory(helper.getAllFaculties, [])

        this.testFactory(helper.getFaculty, [1])

        this.testFactory(helper.createFaculty, [10, 'Akshay', 'Rao', 'PhD', 'akshayro@umich.edu'])

        // helper.createFaculty(10, 'Akshay', 'Rao', 'PhD', 'akshayro@umich.edu').then((resp) => {
        //     this.setState({createFaculty_result: JSON.stringify(resp)});
        // });

        this.testFactory(helper.getAllLabs, [])

    }

    


    render() {
        return(
            <div id='test'>
                <h1>Student Tests</h1>
                <h2>getAllUsers</h2>
                <pre>{this.state.getAllUsers}</pre>
                <h2>registerUser</h2>
                <pre>{this.state.registerUser}</pre>
                <h2>loginUser</h2>
                <pre>{this.state.loginUser}</pre>
                <h2>updateUser</h2>
                <pre>{this.state.updateUser}</pre>
                <h2>verifyLogin</h2>
                <pre>{this.state.verifyLogin}</pre>
                <h2>deleteUser</h2>
                <pre>{this.state.deleteUser}</pre>
                <h2>getAllStudents</h2>
                <pre>{this.state.getAllStudents}</pre>
                <h2>getStudent(4)</h2>
                <pre>{this.state.getStudent}</pre>
                <h2>getStudentSkills</h2>
                <pre>{this.state.getStudentSkills}</pre>
                <h2>getStudentTags</h2>
                <pre>{this.state.getStudentTags}</pre>

                <h1>Faculty Tests</h1>
                <h2>getAllFaculties</h2>
                <pre>{this.state.getAllFaculties}</pre>
                <h2>getFaculty(1)</h2>
                <pre>{this.state.getFaculty}</pre>
                <h2>createFaculty</h2>
                <pre>{this.state.createFaculty}</pre>
                <h2>getAllLabs</h2>
                <pre>{this.state.getAllLabs}</pre>



            </div>
        )
    }
}

export default UserTest