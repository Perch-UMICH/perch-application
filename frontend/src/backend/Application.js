import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormData from 'form-data'
import { 
  getModelHasMany, 
  respond,  
  error_handle, 
  simpleGet,
  simplePut,
  hasManyDelete,
  simplePost,
} from './BackendHelpers'

// Applications
//      name
//      secondId
//      projectId

// Each question is stored separately as an AppQuestion
// which contain
//      responseType ('string', 'number', 'file', 'mult choice', 'checkbox', 'boolean')
//                   ( to be added: 'datetime')
//      number       (will autoincrement based on application)
//      question     (text for the actual question)
//      isRequired
//      applicationId

// Application updating rules:
// 
// If an application has responses and a question is changed (on publish),
// 
export function createApplication({}) {

}

export function addAppQuestion({}) {

}

export function updateAppQuestion({}) {

}

export function removeAppQuestion({}) {

}


// Application responses
// Each response contains:
//      userId
//      applicationId
//      status (default = 'draft')
//
// The responses to individual questions are stored as AppQuestionResponses
// which contain
//      responseType (see AppQuestion)
//      appQuestionId
//      appResponseId
//      ONE OF THE FOLLOWING based on responseType
//          text
//          number
//          array of AppQuestionCheckboxes
//          appQuestionChoiceId (points to the selected choice if multiple choice0)

export function createApplicationResponse({}) {
    
}

export function updateApplicationResponse({}) {

}

export function submitApplicationResponse({}) {

}

export function deleteApplicationResponse({}) {

}

export function getAllUserApplicationResponses({}) {

}