import React, { Component } from 'react'
import './LabSearch.scss'
import Presentation from './Presentation'
import {
  getSearchResults,
  getCurrentUserId,
  getStudentFromUser,
  getSearchData,
  labSearch,
  getAllStudentApplicationResponses
} from '../../helper.js'

class LabSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '',
      loading: false,
      labData: [], // actual data currently rendered on page
      nextLabIds: [], // a bunch of objects with ids to be turned into labData
      usersAppliedProjects: [], // projects a user has already applied for
      savedProjects: [], // list of user's saved projets,
      numLabsToShowOnMore: 10,
      filters: {
        fields: [],
        departments: [],
        skills: [],
        timeCommitment: []
      },
      activeFilters: {
        fields: [],
        skills: [],
        timeCommitment: [],
        departments: []
      }
    }
    this.updateState = this.updateState.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
    this.loadMoreLabs = this.loadMoreLabs.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  // used by children to update this component's state
  updateState (key, value) {
    this.state[key] = value
    this.setState(this.state)
  }

  /*
    Executes a basic search
    loads the project id's that have already been applied for
    and the projects that have been saved
    and the filters for side bar
  */
  componentDidMount () {
    this.executeSearch()
    this.loadSubmittedApplications()
    this.loadSavedProjects()
    this.loadFilters()
  }

  /*
  SEARCH FUNCTIONS
*/

  /*
    Executes search
    Updates labData and nextLabIds
    shows dotloader while waiting for a response
  */
  executeSearch () {
    let { activeFilters, query } = this.state
    this.updateState('loading', true)
    labSearch(...Object.values(activeFilters), query)
      .then(({ data }) => {
        let labIds = data.results
        this.state.nextLabIds = labIds.splice(this.state.numLabsToShowOnMore)
        return getSearchResults(labIds)
      })
      .then(({ data }) => {
        this.state.labData = data.results
        this.state.loading = false
        this.setState(this.state)
      })
  }

  // Get all projects that the student has submitted applications to
  loadSubmittedApplications () {
    getAllStudentApplicationResponses(getCurrentUserId()).then(r => {
      let usersAppliedProjects = r.data.map(app => app.position_id)
      this.setState({ usersAppliedProjects })
    })
  }

  // Get all Projects the user has saved
  loadSavedProjects () {
    getStudentFromUser(getCurrentUserId()).then(({ data }) => {
      this.setState({
        savedProjects: data.position_list.map(project => project.id)
      })
    })
  }

  // load the next X number of labs from your query
  loadMoreLabs () {
    let labIdsToLoad = this.state.nextLabIds.splice(
      0,
      this.state.numLabsToShowOnMore
    )
    getSearchResults(labIdsToLoad).then(r => {
      this.state.labData.push(...r.data.results)
      this.setState(this.state)
    })
  }

  /*
  FILTER FUNCTIONS
*/

  // loads the four filter types into this.state.filters
  loadFilters () {
    getSearchData().then(({ data }) => {
      this.setState({
        filters: {
          fields: data.available_areas,
          departments: data.available_departments,
          skills: data.available_skills,
          timeCommitment: data.all_commitments
        }
      })
    })
  }

  // adds to checked filters, otherwise removes from it
  handleFilterClick (checked, type, filter) {
    let { activeFilters } = this.state
    if (checked) activeFilters[type].push(filter)
    else activeFilters[type] = activeFilters[type].filter(r => r !== filter)
    this.setState({ activeFilters }, this.executeSearch)
  }

  render () {
    let functions = {
      updateParent: this.updateState,
      executeSearch: this.executeSearch,
      loadMoreLabs: this.loadMoreLabs,
      handleFilterClick: this.handleFilterClick
    }

    return <Presentation {...this.state} {...functions} />
  }
}

export default LabSearch
