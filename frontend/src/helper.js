/**
 * Created by aksha on 2/28/2018.
 */

import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import FormData from 'form-data'

axios.defaults.headers.common = {};
axios.defaults.baseURL = 'http://18.211.86.64:8000/';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

if (sessionStorage.token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
}

// HELPER HELPERS //

function respond(status, data) {
    return {'status':status, 'data':data.result, 'msg': data.message}
}

// 0 is a made up error code for non-server-related issues
function error_handle(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return respond(error.response.status, error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return respond(0, error.request)
    } else {
        // Something happened in setting up the request that triggered an Error
        return respond(0, error.message)
    }
}

// AUTHENTICATION //

export function isLoggedIn() {
    if(sessionStorage.getItem('token') == null) {
        console.log('Not logged in');
        return false;
    }
    console.log('Logged in');
    return true;
}

export function verifyLogin() {
    return axios.post('api/verify')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch((error) => {
            return error_handle(error);
        })
}

export function registerUser(name, email, password, password_confirmation) {
    return axios.post('api/register', {
        name,
        email,
        password,
        password_confirmation
    })
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch((error) => {
            return error_handle(error);
        })
}

export function loginUser(email, password) {
    // // Clear all user cookies
    // cookie.remove('perch_api_key');
    // cookie.remove('perch_user_id');

    // Benji changed this
    sessionStorage.clear();

    // Login
    console.log('logging in ' + email);
    //console.log(password);

    return axios.post('api/login', {
        email, password
    })
        .then(response => {
            sessionStorage.setItem('token', response.data.result.token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
            sessionStorage.setItem('user_id', response.data.result.user.id);
            if (response.data.result.user.is_student) {
                // Save student id
                sessionStorage.setItem('student_id', response.data.result.user.student.id);
                // sessionStorage.setItem('faculty_id', null);
            }
            else if (response.data.result.user.is_faculty) {
                // sessionStorage.setItem('student_id', null);
                sessionStorage.setItem('faculty_id', response.data.result.user.faculty.id); // EMI HAS CHANGED THIS! FROM HERE TILL...
                sessionStorage.setItem('lab_id', response.data.result.user.labs[0].id);
                // getUserLabs(response.data.result.user.id).then(resp => {
                //     console.log(resp);
                //     // sessionStorage.setItem('lab_id', somethin_good);
                // }); // ... HERE!
            }
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        });
}

export function logoutCurrentUser() {
    // Clear all user cookies
    //   cookie.remove('perch_api_key');
    //   cookie.remove('perch_user_id');
    let oldToken = sessionStorage.getItem('token');
    // Benji changed this
    sessionStorage.clear();

    return axios.post('api/logout')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch((error) => {
            return error_handle(error);
        })
}

// Email password reset
// First call sendPasswordResetEmail
// User will get a link to /password/reset/{token}
// On that page, have user input email, password, pass confirmation
// Then class resetPasswordFromEmail with this info, along with the token in the url
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

export function resetPasswordFromEmail(email, password, password_confirmation, token) {
    return axios.post('password/reset', {email, password, password_confirmation, token})
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error=> {
            console.error(error);
            return false;
        });
}

// CHANGED BY BENJI (Most of these getId's)

export function getCurrentUserId() {
    return sessionStorage.getItem('user_id');
}

export function getCurrentStudentId() {
    return sessionStorage.getItem('student_id');
}

export function getCurrentLabId() {
    return sessionStorage.getItem('lab_id');
}

export function getCurrentFacultyId() {
    return sessionStorage.getItem('faculty_id');
}

export function isStudent() {
    return sessionStorage.getItem('student_id') != null;
}

export function isLab() {
    return sessionStorage.getItem('lab_id') != null;
}

export function isFaculty() {
    return sessionStorage.getItem('lab_id') != null;
}

// USERS //

// Users
// Base user type on website
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
            return respond(response.status, response.data);
        })
        .catch((error) => {
            return error_handle(error);
        })
}

export function getUser(user_id) {
    console.log('Getting user');
    return axios.get('api/users/' + user_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: user_id
export function deleteUser() {
    console.log('Deleting user');
    let user_id = sessionStorage.getItem('user_id');
    sessionStorage.clear();
    return axios.delete('api/users/' + user_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: user_id
export function updateUser(name, email, password, is_student, is_faculty) {
    console.log('Updating user');

    let _method = 'PUT';
    let user_id = sessionStorage.getItem('user_id');

    return axios.post('api/users/' + user_id, {_method, name, email, password, is_student, is_faculty})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getStudentFromUser(user_id) {
    console.log('Getting student');
    return axios.get('api/users/' + user_id + '/student')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getFacultyFromUser(user_id) {
    console.log('Getting faculty');
    return axios.get('api/users/' + user_id + '/faculty')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Get all labs that this user is a member of, along with their role id
export function getUserLabs(user_id) {
    console.log('Getting user labs');

    return axios.get('api/users/' + user_id + '/labs')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// USER FILES //

// RESTRICTED: user_id
// Possible types:
// 'resume'
// 'profile_pic'
// NOTE: you should pass in a FormData object with the file appended, for example
// let formData = new FormData();
// formData.append('file', fileInputElement.files[0])
// uploadUserFile(formData, 'resume');
export function uploadUserFile(formData, type) {
    if (type !== 'resume' && type !== 'profile_pic') {
        console.log('Error: invalid type parameter');
        return;
    }

    let user_id = sessionStorage.getItem('user_id');

    return axios.post('api/users/' + user_id + '/' + type,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getUserFile(type) {
    if (type !== 'resume' && type !== 'profile_pic') {
        console.log('Error: invalid type parameter');
        return;
    }

    let user_id = sessionStorage.getItem('user_id');

    return axios.get('api/users/' + user_id + '/' + type)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// STUDENTS //

// Students
// Student profile
// Required:
//  user_id - (int, foreign) id of User associated with this profile
//  first_name - (string)
//  last_name - (string)
//  email - (string)
//  year - (string)
// Optional:
// experiences - (string, comma separated) names of past research experiences (lab names)
// classes - (string, comma separated) names of relevant classes
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
// Labs ("favorited")d

export function getAllStudents() {
    console.log('Getting students');
    return axios.get('api/students')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getStudent(student_id) {
    console.log('Getting student');
    return axios.get('api/students/' + student_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function createStudent(user_id, first_name, last_name, contact_email, contact_phone, bio, linkedin_link, website_link, is_urop_student, skill_ids, tag_ids) {
    console.log('Creating student');
    return axios.post('api/students', {user_id, first_name, last_name, contact_email, contact_phone, bio, linkedin_link, website_link, is_urop_student, skill_ids, tag_ids})
        .then(response => {
            sessionStorage.setItem('student_id', response.data.result.id) // CHANGED BY BENJI
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
// NOTE: skill_ids and tag_ids must be an array of integer ids
export function updateStudent(first_name, last_name, contact_email, contact_phone, bio, linkedin_link, website_link, is_urop_student, skill_ids, tag_ids) {
    console.log('Updating student');

    let student_id = sessionStorage.getItem('student_id');
    let _method = 'PUT';
    return axios.post('api/students/' + student_id, {_method, student_id, first_name, last_name, contact_email, contact_phone, bio, linkedin_link, website_link, is_urop_student, skill_ids, tag_ids})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function deleteStudent() {
    console.log('Deleting student');

    let student_id = sessionStorage.getItem('student_id');
    return axios.delete('api/students/' + student_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


export function getStudentSkills(student_id) {
    console.log('Getting student skills');
    return axios.get('api/students/' + student_id + '/skills')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function addSkillsToStudent(skill_ids) {
    console.log('Adding skills to student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        skill_ids: skill_ids
    };
    return axios.post('api/students/' + student_id + '/skills', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function syncSkillsToStudent(skill_ids) {
    console.log('Syncing skills to student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        skill_ids: skill_ids
    };
    return axios.post('api/students/' + student_id + '/skills/sync', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function removeSkillsFromStudent(skill_ids) {
    console.log('Removing skills from student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        skill_ids: skill_ids,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/skills', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


export function getStudentTags(student_id) {
    console.log('Getting student tags');
    return axios.get('api/students/' + student_id + '/tags')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function addTagsToStudent(tag_ids) {
    console.log('Adding tags to student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        tag_ids: tag_ids
    };
    return axios.post('api/students/' + student_id + '/tags', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function syncTagsToStudent(tag_ids) {
    console.log('Syncing tags to student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        tag_ids: tag_ids
    };
    return axios.post('api/students/' + student_id + '/tags/sync', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function removeTagsFromStudent(tag_ids) {
    console.log('Removing tags from student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        tag_ids: tag_ids,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/tags', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


// Lab list
// RESTRICTED: student_id
// NOTE: lab_ids must be an array of integer ids
export function addToStudentPositionList(position_ids) {
    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        position_ids: position_ids
    };
    return axios.post('api/students/' + student_id + '/position_list', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function removeFromStudentPositionList(position_ids) {
    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        position_ids: position_ids,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/position_list', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Edu Experiences
// Description of education at a school/university
// university_name: (string) name of university
// start_date: (string)
// end_date: (string)
// current: (bool) student is currently at this university
// class_experiences: (string) (array) names of classes student took (are taking) at this uni
// majors: (string) (array) names of subjects they majored (are majoring) in

// RESTRICTED: student_id
export function addEduExperienceToStudent(university_name, start_date, end_date, current, year, gpa, class_experience_names, major_names) {
    console.log('Adding edu experiences to student')

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        university_name: university_name,
        start_date: start_date,
        end_date: end_date,
        current: current,
        year: year,
        gpa: gpa,
        class_experience_names: class_experience_names,
        major_names: major_names
    };
    return axios.post('api/students/' + student_id + '/edu_experiences', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function updateEduExperienceOfStudent(edu_experience_id, university_name, start_date, end_date, current, year, gpa, class_experience_names, major_names) {
    console.log('Adding edu experiences to student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        edu_experience_id: edu_experience_id,
        university_name: university_name,
        start_date: start_date,
        end_date: end_date,
        current: current,
        year: year,
        gpa: gpa,
        class_experience_names: class_experience_names,
        major_names: major_names,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/edu_experiences', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
// NOTE: edu_experience_ids must be an array of integer ids
export function removeEduExperiencesFromStudent(edu_experience_ids) {
    console.log('Removing edu experiences from student');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        edu_experience_ids: edu_experience_ids,
    };
    return axios.post('api/students/' + student_id + '/edu_experiences/delete', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Work Experiences
// Student work experience
//  title - (string)
//  description - (string)
//  start_date - (string)
//  end_date - (string)

// RESTRICTED: student_id
// NOTE: Input should be an object formatted like
// {title: 'string',description: 'string',start_date: 'string',end_date: 'string'}
export function addWorkExperienceToStudent(work_experience) {
    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        work_experience: work_experience,
    };
    return axios.post('api/students/' + student_id + '/work_experiences', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function updateWorkExperienceOfStudent(work_experience_id, updated_work_experience) {
    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        work_experience_id: work_experience_id,
        updated_work_experience: updated_work_experience,
        _method: 'PUT'
    };
    return axios.post('api/students/' + student_id + '/work_experiences', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
// NOTE: work_experience_ids must be an array of integer ids
export function removeWorkExperiencesFromStudent(work_experience_ids) {
    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        work_experience_ids: work_experience_ids
    };
    return axios.post('api/students/' + student_id + '/work_experiences/delete', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

//

// export function getStudentSchoolCourses(student_id) {
//     console.log('Getting student school courses');
//     return axios.get('api/students/' + student_id + '/courses/school')
//         .then(response => {
//             console.log(response.data.message);
//             return response.data.result;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return [];
//         })
// }
//
// export function addSchoolCoursesToStudent(student_id, course_ids) {
//     console.log('Adding school courses to student');
//
//     let payload = {
//         course_ids: course_ids
//     };
//     return axios.post('api/students/' + student_id + '/courses/school', payload)
//         .then(response => {
//             console.log(response.data.message);
//             return response.data.result;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return [];
//         })
// }
//
// export function removeSchoolCoursesFromStudent(student_id, course_ids) {
//     console.log('Removing school courses from student');
//
//     let payload = {
//         _method: 'PUT',
//         course_ids: course_ids
//     };
//     return axios.post('api/students/' + student_id + '/courses/school', payload)
//         .then(response => {
//             console.log(response.data.message);
//             return response.data.result;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return [];
//         })
// }

// FACULTY //

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
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getFaculty(faculty_id) {
    console.log('Getting faculty');
    return axios.get('api/faculties/' + faculty_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function createFaculty(user_id, first_name, last_name, title, contact_email) {
    console.log('Creating faculty');
    return axios.post('api/faculties', {user_id, first_name, last_name, title, contact_email}) /// EMI CHANGED THIS: "[]" to "{}"
        .then(response => {
            sessionStorage.setItem('faculty_id', response.data.result.id)
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function updateFaculty(faculty_id, first_name, last_name, title, contact_email) {
    console.log('Updating faculty');
    let _method = 'PUT';
    return axios.post('api/faculties/' + faculty_id, {_method, faculty_id, first_name, last_name, title, contact_email})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function deleteFaculty(faculty_id) {
    console.log('Deleting faculty');
    return axios.delete('api/faculties/' + faculty_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// LABS //

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
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getLab(lab_id) {
    console.log('Getting lab');
    return axios.get('api/labs/' + lab_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// SPECIAL GETTERS
// Along with the base lab object data, specify what other data you need by setting these to true or false:
// skilltag_data, preferences_data, position_data, application_data, student_data, faculty_data
export function getAllLabData(skilltag_data, preferences_data, position_data, application_data, student_data, faculty_data) {
    console.log('Getting all lab data');
    return axios.post('api/labs/all', {skilltag_data, preferences_data, position_data, application_data, student_data, faculty_data})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getLabData(lab_id, skilltag_data, preferences_data, position_data, application_data, student_data, faculty_data) {
    console.log('Getting lab data');
    return axios.post('api/labs/' + lab_id, {skilltag_data, preferences_data, position_data, application_data, student_data, faculty_data})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}
//

export function createLab(faculty_id, name, location, description, publications, url, contact_phone, contact_email) {
    console.log('Creating lab');
    return axios.post('api/labs', {faculty_id, name, location, description, publications, url, contact_phone, contact_email})
        .then(response => {
            sessionStorage.setItem('lab_id', response.data.result.id) // CHANGED BY BENJI
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function updateLab(name, location, description, publications, url, contact_phone, contact_email) {
    console.log('Updating lab');
    let lab_id = sessionStorage.getItem('lab_id');
    let _method = 'PUT';
    return axios.post('api/labs/' + lab_id, {_method, lab_id, name, location, description, publications, url, contact_phone, contact_email})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function deleteLab() {
    console.log('Deleting lab');

    let lab_id = sessionStorage.getItem('lab_id');
    return axios.delete('api/labs/' + lab_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


// NOTE: skill/tags are now added directly to positions; grabbing lab skills/tags compiles across all its positions

export function getLabSkills(lab_id) {
    console.log('Getting lab skills');
    return axios.get('api/labs/' + lab_id + '/skills')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function addSkillsToLab(skill_ids, position_id) {
    console.log('Adding skills to lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        skill_ids: skill_ids,
        position_id: position_id
    };
    return axios.post('api/labs/' + lab_id + '/skills', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function syncSkillsToLab(skill_ids, position_id) {
    console.log('Syncing skills to lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        skill_ids: skill_ids,
        position_id: position_id
    };
    return axios.post('api/labs/' + lab_id + '/skills/sync', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function removeSkillsFromLab(skill_ids, position_id) {
    console.log('Removing skills from lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        skill_ids: skill_ids,
        position_id: position_id,
        _method: 'PUT'
    };
    return axios.post('api/labs/' + lab_id + '/skills', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


export function getLabTags(lab_id) {
    console.log('Getting lab tags');
    return axios.get('api/labs/' + lab_id + '/tags')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function addTagsToLab(tag_ids, position_id) {
    console.log('Adding tags to lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        tag_ids: tag_ids,
        position_id: position_id
    };
    return axios.post('api/labs/' + lab_id + '/tags', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function syncTagsToLab(tag_ids, position_id) {
    console.log('Syncing tags to lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        tag_ids: tag_ids,
        position_id: position_id
    };
    return axios.post('api/labs/' + lab_id + '/tags/sync', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function removeTagsFromLab(tag_ids, position_id) {
    console.log('Removing tag from lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        tag_ids: tag_ids,
        position_id: position_id,
        _method: 'PUT'
    };
    return axios.post('api/labs/' + lab_id + '/tags', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// export function getLabPreferences(lab_id) {
//     console.log('Getting lab preferences');
//     return axios.get('api/labs/' + lab_id + '/preferences')
//         .then(response => {
//             console.log(response.data.message);
//             return response.data.result;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return [];
//         })
// }
//
// // RESTRICTED: lab_id
// export function addPreferencesToLab(preference_ids) {
//     console.log('Adding preferences to lab');
//
//     let lab_id = sessionStorage.getItem('lab_id');
//     let payload = {
//         tag_ids: preference_ids
//     };
//     return axios.post('api/labs/' + lab_id + '/preferences', payload)
//         .then(response => {
//             console.log(response.data.message);
//             return response.data.result;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return [];
//         })
// }
//
// // RESTRICTED: lab_id
// export function removePreferencesFromLab(preference_ids) {
//     console.log('Removing preferences from lab');
//
//     let lab_id = sessionStorage.getItem('lab_id');
//     let payload = {
//         tag_ids: preference_ids,
//         _method: 'PUT'
//     };
//     return axios.post('api/labs/' + lab_id + '/preferences', payload)
//         .then(response => {
//             console.log(response.data.message);
//             return response.data.result;
//         })
//         .catch(function (error) {
//             console.log(error);
//             return [];
//         })
// }


// Lab members
// Note: members are users
// Roles:
//  1: PI - creator of lab; only person who may delete the lab page
//  2: Admin - admin of lab; may edit lab page, create/accept applications, add/remove members, etc.
//  3: Member - normal lab member

export function getLabMembers(lab_id) {
    console.log('Getting lab members');
    return axios.get('api/labs/' + lab_id + '/members')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Order of role_ids should correspond with order of user_ids (same size)
// RESTRICTED: lab_id
export function addMembersToLab(user_ids, role_ids) {
    console.log('Adding members to lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        user_ids: user_ids,
        role_ids: role_ids
    };

    return axios.post('api/labs/' + lab_id + '/members', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function removeMembersFromLab(user_ids) {
    console.log('Removing members from lab');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        _method: 'PUT',
        user_ids: user_ids
    };

    return axios.post('api/labs/' + lab_id + '/members', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// METADATA //

// Skills
// Laboratory skills
// name - (string)
// description - (string)
export function getAllSkills() {
    console.log('Getting all skills');
    return axios.get('api/skills')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getSkill(skill_id) {
    console.log('Getting skill');
    return axios.get('api/skills/' + skill_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function createSkill(name, description) {
    let payload = {
        name: name,
        description: description
    };

    return axios.post('api/skills/', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function searchMatchingSkills(query) {
    return axios.post('api/skills/match', query)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


// Tags
// Academic subjects/disciplines, areas of study, etc.
// name - (string)
// description - (string)
export function getAllTags() {
    console.log('Getting all tags');
    return axios.get('api/tags')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getTag(tag_id) {
    console.log('Getting tag');
    return axios.get('api/tags/' + tag_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function createTag(name, description) {
    let payload = {
        name: name,
        description: description
    };

    return axios.post('api/skills/', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function searchMatchingTags(query) {
    return axios.post('api/tags/match', query)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


// LAB POSITIONS //
// OBSOLETE FOR NOW SINCE WE'RE PRELOADING UROP POSITIONS

// Positions
// Open projects/positions in a lab
//  lab_id - (int) id of lab to associate with
//  title - (string)
//  description -(text)
//  time_commitment - (string) short description of time commitment (e.g. 10-12 hours/week)
//  open_slots - (int) total open slots for applicants
// NOTE: Positions must have an application attached to them to make them "live"

export function getAllLabPositions(lab_id) {
    console.log('Getting all lab positions');
    return axios.get('api/labs/' + lab_id + '/positions')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function getLabPosition(position_id) {
    console.log('Getting position');
    return axios.get('api/positions/' + position_id)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function createLabPosition(title, description, time_commitment, open_slots) {
    console.log('Creating position for lab');

    let lab_id = sessionStorage.getItem('lab_id');

    return axios.post('api/labs/' + lab_id + '/positions', {title, description, time_commitment, open_slots})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function updateLabPosition(position_id, title, description, time_commitment, open_slots) {
    console.log('Updating position');

    let lab_id = sessionStorage.getItem('lab_id');
    return axios.post('api/labs/' + lab_id + '/positions/update', {position_id, title, description, time_commitment, open_slots})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function deleteLabPosition(position_ids) {
    console.log('Deleting positions');

    let lab_id = sessionStorage.getItem('lab_id');
    let payload = {
        position_ids: position_ids
    };

    return axios.post('api/labs/' + lab_id + '/positions/delete', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Applications
// Application of questions attached to an open lab position
// position_id - (integer)
// questions - (array of strings)

export function getPositionApplication(position_id) {
    console.log('Getting application');

    return axios.get('api/positions/' + position_id + '/application')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function createApplication(position_id, questions) {
    console.log('Creating application');

    let lab_id = sessionStorage.getItem('lab_id');

    let payload = {
        position_id: position_id,
        questions: questions
    };

    return axios.post('api/labs/' + lab_id + '/applications', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: lab_id
export function updateApplication(position_id, questions) {
    console.log('Creating application');

    let lab_id = sessionStorage.getItem('lab_id');

    let payload = {
        position_id: position_id,
        questions: questions
    };

    return axios.post('api/labs/' + lab_id + '/applications/update', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Gets ApplicationResponses to a particular position
// RESTRICTED: lab_id
export function getLabPositionApplicants(position_id) {

    let lab_id = sessionStorage.getItem('lab_id');

    console.log('Getting application responses');
    return axios.post('api/labs/' + lab_id + '/positions/responses', {position_id})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Application Responses
// Response to an application for a position, created by a student
// student_id
// position_id
// answers - (array of strings)
// NOTE: 'create' allows a student to start an application, but it must be 'submitted' for the lab to see

// RESTRICTED: student_id
export function createApplicationResponse(position_id, answers) {
    console.log('Creating application response');

    let student_id = sessionStorage.getItem('student_id');

    let payload = {
        student_id: student_id,
        position_id: position_id,
        answers: answers
    };

    return axios.post('api/students/' + student_id + '/responses', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function updateApplicationResponse(application_response_id, answers) {
    console.log('Updating application response');

    let student_id = sessionStorage.getItem('student_id');

    let payload = {
        student_id: student_id,
        position_id: application_response_id,
        answers: answers
    };

    return axios.post('api/students/' + student_id + '/responses/update', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function submitApplicationResponse(application_response_id) {
    console.log('Submitting application response');

    let student_id = sessionStorage.getItem('student_id');

    let payload = {
        student_id: student_id,
        position_id: application_response_id
    };

    return axios.post('api/students/' + student_id + '/responses/update', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// RESTRICTED: student_id
export function deleteApplicationResponse(application_response_id) {
    console.log('Deleting application response');

    let student_id = sessionStorage.getItem('student_id');

    let payload = {
        student_id: student_id,
        position_id: application_response_id
    };

    return axios.post('api/students/' + student_id + '/responses/delete', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Gets responses that haven't yet been submitted (in progress)
// RESTRICTED: student_id
export function getStudentPendingResponses() {
    console.log('Getting application response');

    let student_id = sessionStorage.getItem('student_id');
    let payload = {
        student_id: student_id
    };

    return axios.get('api/students/' + student_id + '/responses', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// MISC //

// Feedback
// User feedback
//  user_id - (int)
//  url - (string) url of the page that user is on at time of submission
//  feedback - (text)
export function submitUserFeedback(user_id, url, feedback) {
    console.log('Submitting feedback');

    return axios.post('api/feedback', {user_id, url, feedback})
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}


// Returns all data necessary for student lab search
export function getSearchData() {
    console.log('Retrieving search data');
    return axios.get('api/search_data')
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

// Does backend lab search based on parameters
// Each parameters should be an array
// Areas, Skills, Commitments, Departments: use getSearchData to obtain possible queries, and use those queries exactly (case sensitive)
// Keywords: can be any string, will search for exact match

// Returns array of matching projects, along with the location of the searched keyword in the "description" of the project
export function labSearch(areas, skills, commitments, departments, keyword) {
    console.log('Performing search');

    let payload = {
        areas: areas,
        skills: skills,
        commitments: commitments,
        departments: departments,
        keyword: keyword
    };

    return axios.post('api/search', payload)
        .then(response => {
            return respond(response.status, response.data);
        })
        .catch(error => {
            return error_handle(error);
        })
}

export function permissionCheck() {
    let page_id = window.location.pathname.split('/')[2]
    let page_type = window.location.pathname.split('/')[1]
    let checkLab = getCurrentLabId() === page_id && page_type === 'prof-page'
    let checkStudent = getCurrentUserId() === page_id && page_type === 'student-profile'
    return checkLab || checkStudent;
}

//// CHANGED BY BENJI

export function returnToProfile() {
    if (isStudent())
        window.location = `/student-profile/${getCurrentUserId()}`;
    else if (isLab())
        window.location = `/prof-page/${getCurrentLabId()}`;
}

export function exists(item) {
    return item ? true : false;
}

/// CHANGED BY EMI

export function deepCopy(object) {
    var output, value, key;
    output = Array.isArray(object) ? [] : {};
    for (key in object) {
        value = object[key];
        output[key] = (typeof value === "object") ? deepCopy(value) : value;
    }
    return output;
}