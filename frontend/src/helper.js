/**
 * Created by aksha on 2/28/2018.
 */

import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';


// const BASE_URL = window.location.hostname + '/';
const BASE_URL = 'http://perch-api.us-east-1.elasticbeanstalk.com/';
//const BASE_URL = 'http://localhost:8000/';

// Redirect to login page if not logged in, or continue
export function isLoggedIn() {
    if(!localStorage.getItem('user_logged_in')) {
        console.log('Not logged in');
        return false;
    } 
    console.log('Logged in');
    return true;
}

export function registerUser(name, email, password, password_confirmation) {
    axios.post('api/register', {
        name,
        email,
        password,
        password_confirmation
    })
        .then(response=> {
            console.log(response.data.message);
            return successfulReg(response);
        })
        .catch(error=> {
            console.error('Error in registration');
            console.error(error);
            return false;
        });
}

function successfulReg(response_in) {
    localStorage.setItem('user_logged_in', true);
    localStorage.setItem('user_token', response_in.data.result.token);

    return setUserDetails(response_in.data.result.token);
}

export function loginUser(email, password) {
    // Clear all user vars in local storage
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');

    // Login
    console.log('logging in ' + email);
    console.log(password);

    axios.post('api/login', {
        email, password
    })
        .then(response => {
            //localStorage.setItem('user_token', response.data.result.token);
            localStorage.setItem('user_logged_in', true);
            localStorage.setItem('user_name', response.data.result.name);
            localStorage.setItem('user_id', response.data.result.id);
            localStorage.setItem('user_email', response.data.result.email);
            console.log('Successfully logged in');
            //setUserDetails(response.data.result.token);
        })
        .catch(error => {
            console.error('Log in unsuccessful');
            console.error(error);
            return false;
        });

    return true;
}

function setUserDetails(token) {
    console.log(token);
    // Save user details to local storage
    axios.post('api/details',
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
        .then(response => {
            localStorage.setItem('user_name', response.data.result.name);
            localStorage.setItem('user_id', response.data.result.id);
            localStorage.setItem('user_email', response.data.result.email);
            console.log(response.data.message);
        })
        .catch(error => {
            console.error(error);
            console.error('Could not get user details');
            return false;
        });

    return true;
}

export function logoutCurrentUser() {
  // Clear all user vars in local storage
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');

    axios.post('api/logout',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
            }
        }
    )
        .then(response => {
            localStorage.removeItem('user_token');
            console.log(response.data.message);
            return true;
        })
        .catch(error => {
            console.error(error);
            console.error('Could not logout');
            return false;
        });
}

// Users

export function getAllUsers() {
    console.log('Getting users');
    return axios.get('api/users')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getCurrentUserEmail() {
    return localStorage.getItem('user_email');
}

export function getCurrentUserId() {
    return localStorage.getItem('user_id');
}

export function getCurrentUsername() {
    return localStorage.getItem('user_name');
}

// Students

export function getAllStudents() {
    console.log('Getting students');
    return axios.get(BASE_URL + 'api/students')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getStudent(student_id) {
    console.log('Getting student');
    return axios.get(BASE_URL + 'api/students/' + student_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function createStudent(user_id, first_name, last_name, major, year, gpa, email) {
    console.log('Creating student');
    return axios.post(BASE_URL + 'api/students/', [user_id, first_name, last_name, major, year, gpa, email])
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function updateStudent(student_id, first_name, last_name, major, year, gpa, email) {
    console.log('Updating student');
    let _method = 'PUT';
    return axios.post(BASE_URL + 'api/students/' + student_id, {_method, student_id, first_name, last_name, major, year, gpa, email})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function deleteStudent(student_id) {
    console.log('Deleting student');
    return axios.delete(BASE_URL + 'api/students/' + student_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getStudentSkills(student_id) {
    console.log('Getting student skills');
    return axios.get(BASE_URL + 'api/students/' + student_id + '/skills')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addSkillToStudent(student_id, skill_id) {
    console.log('Adding skill to student');
    return axios.post(BASE_URL + 'api/students/' + student_id + '/skills', {skill_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeSkillFromStudent(student_id, skill_id) {
    console.log('Removing skill from student');
    return axios.delete(BASE_URL + 'api/students/' + student_id + '/skills', {skill_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getStudentTags(student_id) {
    console.log('Getting student tags');
    return axios.get(BASE_URL + 'api/students/' + student_id + '/tags')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addTagToStudent(student_id, tag_id) {
    console.log('Adding tag to student');
    return axios.post(BASE_URL + 'api/students/' + student_id + '/tags', {tag_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeTagFromStudent(student_id, tag_id) {
    console.log('Removing tag from student');
    return axios.delete(BASE_URL + 'api/students/' + student_id + '/tags', {tag_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getStudentFavLabs(student_id) {
    console.log('Getting student favorite labs');
    return axios.get(BASE_URL + 'api/students/' + student_id + '/labs')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addFavLabToStudent(student_id, lab_id) {
    console.log('Adding favorite lab to student');
    return axios.post(BASE_URL + 'api/students/' + student_id + '/labs', {lab_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeFavLabFromStudent(student_id, lab_id) {
    console.log('Removing favorite lab from student');
    return axios.delete(BASE_URL + 'api/students/' + student_id + '/labs', {lab_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

// Faculties

export function getAllFaculties() {
    console.log('Getting all faculty');
    return axios.get(BASE_URL + 'api/faculties')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getFaculty(faculty_id) {
    console.log('Getting faculty');
    return axios.get(BASE_URL + 'api/faculties/' + faculty_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function createFaculty(user_id, first_name, last_name, title, email) {
    console.log('Creating faculty');
    return axios.post(BASE_URL + 'api/faculties/', [user_id, first_name, last_name, title, email])
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function updateFaculty(faculty_id, first_name, last_name, title, email) {
    console.log('Updating faculty');
    let _method = 'PUT';
    return axios.post(BASE_URL + 'api/faculties/' + faculty_id, {_method, faculty_id, first_name, last_name, title, email})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function deleteFaculty(faculty_id) {
    console.log('Deleting faculty');
    return axios.delete(BASE_URL + 'api/faculties/' + faculty_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getFacultyLabs(faculty_id) {
    console.log('Getting faculty labs');
    return axios.get(BASE_URL + 'api/faculties/' + faculty_id + '/labs')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addLabToFaculty(faculty_id, lab_id) {
    console.log('Adding lab to faculty');
    return axios.post(BASE_URL + 'api/faculties/' + faculty_id + '/labs', {lab_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeLabFromFaculty(faculty_id, lab_id) {
    console.log('Removing lab from faculty');
    return axios.delete(BASE_URL + 'api/faculties/' + faculty_id + '/labs', {lab_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

// Labs

export function getAllLabs() {
    console.log('Getting all labs');
    return axios.get(BASE_URL + 'api/labs')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getLab(lab_id) {
    console.log('Getting lab');
    return axios.get(BASE_URL + 'api/labs/' + lab_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function createLab(faculty_id, name, department, location, description, publications, url, gpa, weeklyCommitment) {
    console.log('Creating lab');
    return axios.post(BASE_URL + 'api/labs/', [faculty_id, name, department, location, description, publications, url, gpa, weeklyCommitment])
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function updateLab(lab_id, name, department, location, description, publications, url, gpa, weeklyCommitment) {
    console.log('Updating lab');
    let _method = 'PUT';
    return axios.post(BASE_URL + 'api/labs/' + lab_id, {_method, lab_id, name, department, location, description, publications, url, gpa, weeklyCommitment})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function deleteLab(lab_id) {
    console.log('Deleting lab');
    return axios.delete(BASE_URL + 'api/labs/' + lab_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getLabSkills(lab_id) {
    console.log('Getting lab skills');
    return axios.get(BASE_URL + 'api/labs/' + lab_id + '/skills')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addSkillToLab(lab_id, skill_id) {
    console.log('Adding skill to lab');
    return axios.post(BASE_URL + 'api/labs/' + lab_id + '/skills', {skill_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeSkillFromLab(lab_id, skill_id) {
    console.log('Removing skill from lab');
    return axios.delete(BASE_URL + 'api/labs/' + lab_id + '/skills', {skill_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getLabTags(lab_id) {
    console.log('Getting lab tags');
    return axios.get(BASE_URL + 'api/labs/' + lab_id + '/tags')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addTagToLab(lab_id, tag_id) {
    console.log('Adding tag to lab');
    return axios.post(BASE_URL + 'api/labs/' + tag_id + '/tags', {tag_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeTagFromLab(lab_id, tag_id) {
    console.log('Removing tag from lab');
    return axios.delete(BASE_URL + 'api/labs/' + tag_id + '/tags', {tag_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

// Skills

export function getAllSkills() {
    console.log('Getting all skills');
    return axios.get(BASE_URL + 'api/skills')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getSkill(skill_id) {
    console.log('Getting skill');
    return axios.get(BASE_URL + 'api/skills/' + skill_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

// Tags

export function getAllTags() {
    console.log('Getting all tags');
    return axios.get(BASE_URL + 'api/tags')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getTag(tag_id) {
    console.log('Getting tag');
    return axios.get(BASE_URL + 'api/tags/' + tag_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}