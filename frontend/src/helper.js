/**
 * Created by aksha on 2/28/2018.
 */

import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
// import { cookie } from 'react-cookie'
import FormData from 'form-data'

axios.defaults.headers.common = {};
axios.defaults.baseURL = 'http://perch-api.us-east-1.elasticbeanstalk.com';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Authentication
export function isLoggedIn() {
    if(localStorage.getItem('token') == null) {
        console.log('Not logged in');
        return false;
    }
    console.log('Logged in');
    return true;
}

export function verifyLogin() {
    return axios.post('api/verify',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
    )
        .then(response => {
            console.log(response.data);
            return true;
        })
        .catch(error => {
            console.error(error);
            console.error('User not verified');
            return false;
        });
}

export function registerUser(name, email, password, password_confirmation) {
    return axios.post('api/register', {
        name,
        email,
        password,
        password_confirmation
    })
        .then(response=> {
            console.log(response.data.message);
            // redirect to login
            return response.data;
        })
        .catch(error=> {
            console.error('Error in registration');
            console.error(error);
            return false;
        });
}

export function loginUser(email, password) {
    // // Clear all user cookies
    // cookie.remove('perch_api_key');
    // cookie.remove('perch_user_id');

    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    // Login
    console.log('logging in ' + email);
    //console.log(password);

    return axios.post('api/login', {
        email, password
    })
        .then(response => {
            // cookie.set('perch_api_key', response.data.result.token, {path: "/"});
            // cookie.set('perch_user_id', response.data.result.id, {path: "/"});
            localStorage.setItem('token', response.data.result[1].token);
            localStorage.setItem('user_id', response.data.result[0].id);
            console.log('Successfully logged in');
            return response.data
        })
        .catch(error => {
            console.error('Log in unsuccessful');
            console.error(error);
            return false;
        });
}

export function logoutCurrentUser() {
  // Clear all user cookies
  //   cookie.remove('perch_api_key');
  //   cookie.remove('perch_user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    return axios.post('api/logout',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
    )
        .then(response => {
            // cookie.remove('perch_api_key');
            // cookie.remove('perch_user_id');

            console.log(response.data.message);
            return true;
        })
        .catch(error => {
            console.error(error);
            console.error('Could not logout');
            return false;
        });
}

export function sendPasswordResetEmail(email) {
    return axios.post('password/email', {email})
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error=> {
            console.error(error);
            return false;
        });
}

export function resetPassword(email, password, password_confirmation) {
    return axios.post('password/request', {email, password, password_confirmation})
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error=> {
            console.error(error);
            return false;
        });
}


// USERS
// Base user on website
// Required:
    // name - (string) username
    // email - (string) sign up email
    // google_id - (int) unique id associated with google account
// Optional:
    // is_student - (bool)
    // is_faculty - (bool)

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

export function getUser(user_id) {
    console.log('Getting user');
    return axios.get('api/users/' + user_id)
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function deleteUser(user_id) {
    console.log('Deleting user');
    return axios.delete('api/users/' + user_id)
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getStudentFromUser(user_id) {
    console.log('Getting student');
    return axios.get('api/users/' + user_id + '/student')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function getFacultyFromUser(user_id) {
    console.log('Getting faculty');
    return axios.get('api/users/' + user_id + '/faculty')
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


// Students
// Student profile
// Required:
    //  user_id - (int, foreign) id of User associated with this profile
    //  first_name - (string)
    //  last_name - (string)
    //  email - (string)
    //  year - (string)
// Optional:
    // past_research - (text) description of past research experience
    // bio - (text) short bio on student goals
    // major - (string) degree pursuing
    // gpa - (double)
    // linkedin_user - (string) link to linkedin user profile
    // belongs_to_lab_id - (int, foreign) id of lab on site that student current belongs to
    // faculty_endorsements - (text) names of endorsing professors
// Associations
    // Users
    // Skills
    // Tags
    // Labs ("favorited")

export function getAllStudents() {
    console.log('Getting students');
    return axios.get('api/students')
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
    return axios.get('api/students/' + student_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function createStudent(user_id, first_name, last_name, major, year, gpa, email, bio, past_research, faculty_endorsement_id) {
    console.log('Creating student');
    return axios.post('api/students', {user_id, first_name, last_name, major, year, gpa, email, bio, past_research, faculty_endorsement_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function updateStudent(student_id, first_name, last_name, major, year, gpa, email, bio, past_research, faculty_endorsement_id) {
    console.log('Updating student');
    let _method = 'PUT';
    return axios.post('api/students/' + student_id, {_method, student_id, first_name, last_name, major, year, gpa, email, bio, past_research, faculty_endorsement_id})
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
    return axios.delete('api/students/' + student_id)
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
    return axios.get('api/students/' + student_id + '/skills')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addSkillsToStudent(student_id, skill_ids) {
    console.log('Adding skills to student');

    let payload = {
        skill_ids: skill_ids
    };
    return axios.post('api/students/' + student_id + '/skills', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function syncSkillsToStudent(student_id, skill_ids) {
    console.log('Syncing skills to student');

    let payload = {
        skill_ids: skill_ids
    };
    return axios.post('api/students/' + student_id + '/skills/sync', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeSkillsFromStudent(student_id, skill_ids) {
    console.log('Removing skills from student');

    let payload = {
        skill_ids: skill_ids,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/skills', payload)
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
    return axios.get('api/students/' + student_id + '/tags')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addTagsToStudent(student_id, tag_ids) {
    console.log('Adding tags to student');

    let payload = {
        tag_ids: tag_ids
    };
    return axios.post('api/students/' + student_id + '/tags', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function syncTagsToStudent(student_id, tag_ids) {
    console.log('Syncing tags to student');

    let payload = {
        tag_ids: tag_ids
    };
    return axios.post('api/students/' + student_id + '/tags/sync', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeTagsFromStudent(student_id, tag_ids) {
    console.log('Removing tags from student');

    let payload = {
        tag_ids: tag_ids,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/tags', payload)
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
    return axios.get('api/students/' + student_id + '/labs')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addFavLabsToStudent(student_id, lab_ids) {
    console.log('Adding favorite lab to student');

    let payload = {
        tag_ids: lab_ids
    };
    return axios.post('api/students/' + student_id + '/labs', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeFavLabsFromStudent(student_id, lab_ids) {
    console.log('Removing favorite lab from student');

    let payload = {
        tag_ids: lab_ids,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/labs', payload)
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
// Faculty profile
// Required:
    // user_id - (int, foreign) id of User associated with this profile
    // first_name - (string)
    // last_name - (string)
    // email - (string) contact email address
// Optional:
    // title - (string) title of position in university (e.g. PI, assistant prof, grad student)
// Associations
    // Users
    // Labs

export function getAllFaculties() {
    console.log('Getting all faculty');
    return axios.get('api/faculties')
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
    return axios.get('api/faculties/' + faculty_id)
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
    return axios.post('api/faculties/', [user_id, first_name, last_name, title, email])
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
    return axios.post('api/faculties/' + faculty_id, {_method, faculty_id, first_name, last_name, title, email})
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
    return axios.delete('api/faculties/' + faculty_id)
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
    return axios.get('api/faculties/' + faculty_id + '/labs')
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
    return axios.post('api/faculties/' + faculty_id + '/labs', {lab_id})
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
    let _method = 'PUT';
    return axios.post('api/faculties/' + faculty_id + '/labs', {lab_id, _method})
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
// Lab page
// Required:
    // name - (string)
    // department - (string)
    // description - (text) short description of lab goals
// Optional:
    // publications - (text) description of recent publications
    // url - (string) url to official lab page
    // location - (string) location at university
    // contact_phone - (string)
    // contact_email - (string)
    // gpa - (float) desired GPA of applicants
    // weeklyCommitment - (int) hours/week of commitment expected
// Associations
    // Skills
    // Tags
    // Students
    // Faculties

export function getAllLabs() {
    console.log('Getting all labs');
    return axios.get('api/labs')
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
    return axios.get('api/labs/' + lab_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function createLab(faculty_id, name, department, location, description, publications, url, gpa, weeklyCommitment, contact_phone, contact_email) {
    console.log('Creating lab');
    return axios.post('api/labs/', [faculty_id, name, department, location, description, publications, url, gpa, weeklyCommitment, contact_phone, contact_email])
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function updateLab(lab_id, name, department, location, description, publications, url, gpa, weeklyCommitment, contact_phone, contact_email) {
    console.log('Updating lab');
    let _method = 'PUT';
    return axios.post('api/labs/' + lab_id, {_method, lab_id, name, department, location, description, publications, url, gpa, weeklyCommitment, contact_phone, contact_email})
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
    return axios.delete('api/labs/' + lab_id)
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
    return axios.get('api/labs/' + lab_id + '/skills')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addSkillsToLab(lab_id, skill_ids) {
    console.log('Adding skills to lab');

    let payload = {
        skill_ids: skill_ids
    };
    return axios.post('api/labs/' + lab_id + '/skills', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function syncSkillsToLab(lab_id, skill_ids) {
    console.log('Syncing skills to lab');

    let payload = {
        skill_ids: skill_ids
    };
    return axios.post('api/labs/' + lab_id + '/skills/sync', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeSkillsFromLab(lab_id, skill_ids) {
    console.log('Removing skills from lab');

    let payload = {
        skill_ids: skill_ids,
        _method: 'PUT'
    };
    return axios.post('api/labs/' + lab_id + '/skills', payload)
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
    return axios.get('api/labs/' + lab_id + '/tags')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addTagsToLab(lab_id, tag_ids) {
    console.log('Adding tags to lab');

    let payload = {
        tag_ids: tag_ids
    };
    return axios.post('api/labs/' + lab_id + '/tags', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function syncTagsToLab(lab_id, tag_ids) {
    console.log('Syncing tags to lab');

    let payload = {
        tag_ids: tag_ids
    };
    return axios.post('api/labs/' + lab_id + '/tags/sync', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removeTagsFromLab(lab_id, tag_ids) {
    console.log('Removing tag from lab');

    let payload = {
        tag_ids: tag_ids,
        _method: 'PUT'
    };
    return axios.post('api/labs/' + lab_id + '/tags', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getLabPreferences(lab_id) {
    console.log('Getting lab preferences');
    return axios.get('api/labs/' + lab_id + '/preferences')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function addPreferencesToLab(lab_id, preference_ids) {
    console.log('Adding preferences to lab');

    let payload = {
        tag_ids: preference_ids
    };
    return axios.post('api/labs/' + lab_id + '/preferences', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function removePreferencesFromLab(lab_id, preference_ids) {
    console.log('Removing preferences from lab');

    let payload = {
        tag_ids: preference_ids,
        _method: 'PUT'
    };
    return axios.post('api/labs/' + lab_id + '/preferences', payload)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


export function getLabPositions(lab_id) {
    console.log('Getting lab positions');
    return axios.get('api/labs/' + lab_id + '/positions')
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function createPosition(lab_id, title, description, time_commitment, open_slots, filled_slots, open) {
    console.log('Creating lab positions');

    return axios.post('api/labs/' + lab_id + '/positions', [title, description, time_commitment, open_slots, filled_slots, open])
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

export function deletePosition(lab_id, position_ids) {
    console.log('Deleting lab positions');

    let payload = {
        position_ids: position_ids,
        _method: 'PUT'
    };

    return axios.post('api/labs/' + lab_id + '/positions', payload)
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
// Laboratory skills
// Required:
    // name - (string)
// Optional:
    // description - (string)
export function getAllSkills() {
    console.log('Getting all skills');
    return axios.get('api/skills')
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
    return axios.get('api/skills/' + skill_id)
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
// Academic subjects/disciplines, areas of study, etc.
// Required:
    // name - (string)
// Optional:
    // description - (string)
export function getAllTags() {
    console.log('Getting all tags');
    return axios.get('api/tags')
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
    return axios.get('api/tags/' + tag_id)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}

// Positions
// Open projects/positions in a lab
// Required:
//  title - (string)
//  description -(text)
// Optional:
//  time_commitment - (string) short description of time commitment (e.g. 10-12 hours/week)
//  open_slots - (int) total open slots for applicants
//  filled_slots - (int) # of open slots that have been filled
//  open - (bool) whether positions is current accepting applicants

// TODO

// data should be of type FormData
// see: https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
// type - should be either "student", "faculty", or "lab"
// id - based on type, should be the id of that object
export function uploadPic(type, id, data) {
    data.set('type', type);
    data.set('id', id);
    console.log(data);
    return axios.post('api/pics', data)
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}


// Returns all data necessary for student lab search
// student_id - id of the student who's searching
export function getSearchData(student_id) {
    console.log('Retrieving search data');
    return axios.post('api/search', {student_id})
        .then(response => {
            console.log(response.data.message);
            return response.data.result;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        })
}





/////

export function getCurrentUserId() {
    return localStorage.getItem('user_id');
}