/**
 * Created by aksha on 7/22/2018.
 */
import React from 'react'
import {getAllUsers, registerUser, updateUser, deleteUser, loginUser, verifyLogin, isLoggedIn} from './helper'

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
        registerUser('name','email','password','password').then(function (resp) {
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

                            //Then, checked if the user is logged in (they shouldn't be)
                            comp.setState({isLoggedIn_result: isLoggedIn().toString});
                        });
                    });
                });
            });
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
                <h2>isLoggedIn</h2>
                <p>{this.state.isLoggedIn_result}</p>
            </div>
        )
    }
}

export default UserTest