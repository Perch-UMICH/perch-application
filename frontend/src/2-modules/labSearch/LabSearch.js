import React, { Component } from 'react'
import './LabSearch.scss'
import ExpanderIcons from '../utilities/ExpanderIcons'
import DotLoader from '../utilities/animations/DotLoader'
import LabSearchItem from './LabSearchItem'
import InfiniteScroll from 'react-infinite-scroller'

import {
  isStudent,
  getSearchResults,
  getCurrentUserId,
  getStudentFromUser,
  getSearchData,
  labSearch,
  getAllStudentApplicationResponses
} from '../../helper.js'

const filterTypes = ['researchAreas', 'departments', 'minReqs', 'lab-skills']
const filterFriendlyNames = [
  'Research Areas',
  'Organizations',
  'Hours',
  'Lab Skills'
]

class LabSearch extends Component {
  constructor (props) {
    super(props)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.loadApplicationSubmitted = this.loadApplicationSubmitted.bind(this)
    var filts = {}
    var parentFilts = {}
    filterTypes.map(type => {
      filts[type] = {}
      parentFilts[type] = []
    })

    this.state = {
      filts,
      parentFilts,
      next: [],
      ids_to_show: [],
      all_labs: [],
      areas: [],
      departments: [],
      commitments: [],
      skills: [],
      s_id: '',
      search: '',
      lab_list: [],
      loading: true,
      limit: 5
    }
  }

  moreLabs () {
    // 1. grabs the positions from the next up labs
    let positions = this.state.next
    let limit = this.state.limit
    let newState = {
      all_labs: this.state.all_labs
    }

    // 2. if the number of positions is greater than the limit, we take off the limit num of positions
    newState.next = positions.slice(limit)

    // 3. We grab the results from the first limit of labs available
    getSearchResults(positions.slice(0, limit)).then(r => {
      let all_labs = r.data.results
      let { lab_list, positions_applied } = this.state

      for (var key in all_labs) {
        let lab = all_labs[key]
        let { id, name, projects } = lab

        newState.all_labs.push(
          <LabSearchItem
            key={id}
            id={id}
            saved_labs={lab_list}
            name={name}
            positions={projects}
            positions_applied={positions_applied}
          />
        )
      }
      newState.loading = false
      this.setState(newState)
    })
  }

  componentWillMount () {
    let newState = {
      all_labs: []
    }

    labSearch([], [], [], [], '')
      .then(r => {
        let positions = r.data.results
        let limit = this.state.limit
        if (positions.length > limit) newState.next = positions.slice(limit)

        return getSearchResults(positions.slice(0, limit))
      })
      .then(r => {
        let all_labs = r.data.results
        for (var key in all_labs) {
          let lab = all_labs[key]
          newState.all_labs.push(
            <LabSearchItem
              key={lab.id}
              id={lab.id}
              saved_labs={this.state.lab_list}
              name={lab.name}
              dept='MISSING'
              rsrch='MISSING'
              img='/img/headshots/salektiar.jpg'
              description='NULL'
              positions_applied={this.state.positions_applied}
              positions={lab.projects}
            />
          )
        }
        newState.loading = false
        this.setState(newState)
      })

    getSearchData().then(resp => {
      let new_filts = this.state.filts
      let new_parentFilts = this.state.parentFilts

      resp.data.all_commitments.map(req => {
        new_filts['minReqs'][req] = { friendlyName: req, slug: req }
        new_parentFilts['minReqs'].push({ friendlyName: req, slug: req })
      })

      resp.data.available_skills.map(skill => {
        new_filts['lab-skills'][skill] = { friendlyName: skill, slug: skill }
        new_parentFilts['lab-skills'].push({ friendlyName: skill, slug: skill })
      })

      resp.data.available_areas.map(area => {
        new_filts['researchAreas'][area] = { friendlyName: area, slug: area }
        new_parentFilts['researchAreas'].push({
          friendlyName: area,
          slug: area
        })
      })

      resp.data.available_departments.map(dept => {
        new_filts['departments'][dept] = { friendlyName: dept, slug: dept }
        new_parentFilts['departments'].push({
          friendlyName: dept,
          slug: dept,
          clicked: true
        })
      })

      this.setState({ filts: new_filts, parentFilts: new_parentFilts })
    })
  }

  expand (type) {
    document.getElementById(`${type}-filter`).classList.toggle('expand')
  }

  componentDidMount () {
    this.expand('researchAreas')
    if (isStudent()) {
      getStudentFromUser(getCurrentUserId()).then(resp => {
        this.setState({ lab_list: resp.data.position_list })
      })
      this.loadApplicationSubmitted()
    }
  }

  loadApplicationSubmitted () {
    // Get all positions that the student has submitted applications to
    getAllStudentApplicationResponses(getCurrentUserId()).then(resp => {
      let positions_applied = resp.data.map(app => {
        return app.position_id
      })
      this.setState({ positions_applied })
    })
  }

  handleFilterClick (filterType, slug) {
    var newState = this.state
    if (newState.filts[filterType][slug].clicked) {
      newState.filts[filterType][slug].clicked = false

      switch (filterType) {
        case 'departments':
          newState.departments.splice(newState.departments.indexOf(slug), 1)
          break
        case 'researchAreas':
          newState.areas.splice(newState.areas.indexOf(slug), 1)
          break
        case 'minReqs':
          newState.commitments.splice(newState.commitments.indexOf(slug), 1)
          break
        case 'lab-skills':
          newState.skills.splice(newState.skills.indexOf(slug), 1)
          break
      }
    } else {
      newState.filts[filterType][slug].clicked = true

      switch (filterType) {
        case 'departments':
          newState.departments.push(slug)
          break
        case 'researchAreas':
          newState.areas.push(slug)
          break
        case 'minReqs':
          newState.commitments.push(slug)
          break
        case 'lab-skills':
          newState.skills.push(slug)
          break
      }
    }
    this.setState(newState)
    this.executeSearch({ key: 'Enter' })
  }

  closeModifiers () {
    document.getElementById('lab-search-box').classList.add('hide')
  }

  updateSearch (event) {
    // event.preventDefault()
    // if (event.keyCode == 13) {
    // alert(event.keyCode)
    this.setState({ search: event.target.value })
    // }
  }

  /*

	Here's my search data, send to Akshay wiht labsearch

	Akshay sends back a list of objects, { which have a labid, and its relevant projets }

	Then I save everything after my slice

	And then I ask you for everything before that slice

	and then i save what i should as kfor later

	LabSearch

	[
		[proj1, proj2],     // lab 4
		[proj19, proj20],   // lab 20
	]

  */

  executeSearch (event) {
    let { areas, skills, commitments, departments, search } = this.state
    if (event.key === 'Enter') {
      this.setState({ loading: true }, () => {
        var newState = this.state
        labSearch(areas, skills, commitments, departments, search)
          .then(r => {
            newState.all_labs = []
            let positions = r.data.results || r.data
            let limit = this.state.limit
            newState.next = positions.slice(limit)

            return getSearchResults(positions.slice(0, limit))
          })
          .then(r => {
            var all_search_labs = r.data.results

            all_search_labs.map(lab =>
              newState.all_labs.push(
                <LabSearchItem
                  name={lab.name}
                  saved_labs={this.state.lab_list}
                  key={lab.id}
                  id={lab.id}
                  dept='MISSING'
                  rsrch='MISSING'
                  img='/img/headshots/salektiar.jpg'
                  description='NULL'
                  positions={lab.projects}
                  positions_applied={this.state.positions_applied}
                />
              )
            )
            newState.loading = false
            this.setState(newState)
          })
          .catch(e => alert('errror'))
      })
    }
  }

  filterStuff () {
    var filterContentArr = []
    filterTypes.map(type => {
      var filterContent = (
        <ul className='search-filter-content'>
          {this.state.parentFilts[type].map(filt => {
            var subFiltSection = null
            if (
              this.state.filts[type][filt.slug].clicked &&
              filt.subFilts &&
              filt.subFilts.length > 0
            ) {
              subFiltSection = (
                <ul className='subfilter'>
                  {filt.subFilts.map(subFiltSlug => {
                    var subFilt = this.state.filts[type][subFiltSlug]
                    return (
                      <li key={subFilt.slug}>
                        <input
                          type='checkbox'
                          className='checkbox-white filled-in'
                          onClick={() =>
                            this.handleFilterClick(type, filt.slug)
                          }
                          id={subFilt.slug}
                        />
                        <label
                          className='filter-checkbox-label'
                          for={subFilt.slug}
                        >
                          {subFilt.friendlyName}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              )
            }
            var labelContent = null
            if (filt.subFilts && filt.subFilts.length > 0) {
              var expandCSS = this.state.filts[type][filt.slug].clicked
                ? 'search-expand-less'
                : 'search-expand-more'
              labelContent = (
                <li key={filt.slug}>
                  <div className='filter-dropdown-container'>
                    <a className={expandCSS} id={filt.slug}>
                      <i className='material-icons'>
                        {this.state.filts[type][filt.slug].clicked
                          ? 'expand_less'
                          : 'expand_more'}
                      </i>
                    </a>
                    <div className='filter-dropdown-label'>
                      {filt.friendlyName}
                    </div>
                  </div>
                  {subFiltSection}
                </li>
              )
            } else {
              labelContent = (
                <li key={filt.slug}>
                  <input
                    type='checkbox'
                    className='checkbox-white filled-in'
                    onClick={() => this.handleFilterClick(type, filt.slug)}
                    id={filt.slug}
                  />
                  <label className='filter-checkbox-label' htmlFor={filt.slug}>
                    {filt.friendlyName}
                  </label>
                </li>
              )
            }
            return labelContent
          })}
        </ul>
      )

      filterContentArr.push(
        <div className='search-filter-content-wrapper'>{filterContent}</div>
      )
    })
    return filterContentArr
  }

  render () {
    var filterContentArr = this.filterStuff()

    return (
      <div className='search_shell'>
        <SearchSideBar
          filterTypes={filterTypes}
          filterFriendlyNames={filterFriendlyNames}
          filterContentArr={filterContentArr}
          expand={this.expand.bind(this)}
        />
        <SearchBody
          all_labs={this.state.all_labs}
          next={this.state.next}
          search={this.state.search}
          executeSearch={this.executeSearch.bind(this)}
          moreLabs={this.moreLabs.bind(this)}
          updateSearch={this.updateSearch.bind(this)}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

function SearchBody ({
  all_labs,
  next,
  search,
  executeSearch,
  moreLabs,
  updateSearch,
  loading
}) {
  let labs_shown = all_labs.length

  let labs_left = next.length

  let total_labs = labs_shown + labs_left
  return (
    <div id='search_results'>
      <input
        onKeyUp={updateSearch}
        type='text'
        placeholder='keywords'
        onKeyPress={executeSearch}
      />
      <aside>
        Groups 1-{labs_shown} ({total_labs} total) for <b>{search}</b>
      </aside>
      <main>
      {!loading && all_labs}
      {loading && <DotLoader/>}
      </main>
      {labs_left > 0 && (
        <button id='lab-srch-more' onClick={moreLabs}>
          Mo' labs, mo' problems
        </button>
      )}
    </div>
  )
}

function SearchSideBar ({
  filterTypes,
  filterFriendlyNames,
  filterContentArr,
  expand
}) {
  return (
    <aside className='search-sidebar'>
      {filterTypes.map((type, idx) => {
        return (
          <div className='filter_type'>
            <div
              key={`${type}-filter`}
              id={`${type}-filter`}
              className='search-filter-container'
            >
              <div className='search-filter-title'>
                {filterFriendlyNames[idx]}
              </div>
              <ExpanderIcons
                id={`${type}-filter`}
                classBase='search-filter-container'
                action={() => expand(type)}
                preClick={type === 'researchAreas'}
                filterDropdown
              />
              <hr className='filter-hr' />
              {filterContentArr[idx]}
            </div>
          </div>
        )
      })}
    </aside>
  )
}

export default LabSearch
