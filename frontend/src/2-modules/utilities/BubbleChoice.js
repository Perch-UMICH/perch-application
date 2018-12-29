import React, { Component } from 'react'
import Bubble from './Bubble'
import {
  getAllTags,
  getAllSkills,
  getCurrentStudentId,
  createSkill,
  createTag,
  getStudentSkills,
  getStudentTags
} from '../../helper.js'
import '../user/individual/PickYourInterests.scss'

class BubbleChoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      options_full: [], // Full options to choose from.
      options: [], // Filtered options.
      chosen: [], // Student choices.
      search_val: ''
    }
    this.passChosen.bind(this)
  }

  componentDidMount () {
    // Load initial options & choices.
    let getChoices = this.props.skills ? getStudentSkills : getStudentTags
    let getOptions = this.props.skills ? getAllSkills : getAllTags
		let student_id = getCurrentStudentId()
		
		let chosen, options, options_full = null
    getChoices(student_id)
      .then(r => (chosen = r.data && r.data.length ? r.data : []))
      .then(r => getOptions(student_id))
      .then(r => {
        options_full = r.data && r.data.length ? r.data : []
        options = options_full.filter(
          e => chosen.map(c => c.id).indexOf(e.id) == -1
        )
      })
      .then(r => this.setState({ chosen, options, options_full }))
  }

  clickAdd (b) {
    // Remove bubble from options and add to chosen.
		let {options, chosen} = this.state
    let b_idx = options
      .map(o => {
        return o.id
      })
      .indexOf(b.id)

    options.splice(b_idx, 1)
    chosen.push(b)

    this.setState({ options, chosen })
    this.passChosen(chosen)
  }

  clickDelete (b) {
		// Remove bubble from options and add to chosen.
		let {options, chosen} = this.state

    let b_idx = chosen
      .map(c => {
        return c.id
      })
      .indexOf(b.id)

    chosen.splice(b_idx, 1)
    options.push(b)

    this.setState({ options, chosen })
    this.passChosen(chosen)
    this.filterList()
  }

  clickCustomAdd () {
    // Add new skill/interest with custom adder.
    let createBubble = this.props.skills ? createSkill : createTag
    let options_full = this.state.options_full
    let chosen = this.state.chosen
    let new_name = this.state.search_val.toLowerCase()
    let existing, already_chosen = null

    // Check if already exists in options or has been chosen.
    if (!new_name || new_name == 0) return
    options_full.map(o => { 
      if (o.name.toLowerCase() == new_name) 
          existing = o })
    chosen.map(c => { 
      if (c.name.toLowerCase() == new_name) 
          already_chosen = true })

    if (already_chosen) return
    if (existing) {
      this.clickAdd(existing)
      return }

    createBubble(new_name, '').then(r => {
      options_full.push(r.data)
    	chosen.push(r.data)
    	this.setState({options_full, chosen})
      this.passChosen(chosen)
      this.filterList()
    })
  }

  passChosen (chosen) {
		// Update parent with new choices.
		let {passChosen, skills} = this.props
    if (passChosen) passChosen(chosen, skills)
  }

  updateSearch(e) {
    this.setState({ search_val: e.target.value }, this.filterList.bind(this))
  }

  filterList () {
    // Using search box, filter options.
    let options = this.state.options_full.filter(o => {
      let matches_search =
        o.name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .search(
            this.state.search_val.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')
          ) !== -1
      return (
        matches_search &&
        this.state.chosen
          .map(c => {
            return c.id
          })
          .indexOf(o.id) == -1
      )
    })
    this.setState({ options })
  }

  render () {
    let placeholder = this.props.skills ? 'search skills' : 'search interests'
    let header = this.props.skills ? 'Your Skills' : 'Your Interests'

    return (
      <div className='bbl-container'>
        <div className='bbl-section'>
          <div className="bbl-custom-add" onClick={this.clickCustomAdd.bind(this)}>+ custom</div>
          <input
            className='bbl-search'
            type='text'
            placeholder={placeholder}
            value={this.state.search_val}
            onChange={this.updateSearch.bind(this)}
          />
          <div className='bbl-body'>
            {this.state.options.map((o, idx) => {
              return (
                <div key={`op_${idx}`} onClick={this.clickAdd.bind(this, o)}>
                  <Bubble txt={o.name} type='adder' />
                </div>
              )
            })}
          </div>
        </div>
        <div className='bbl-section right'>
          <div className='bbl-header'>{header}</div>
          <div className='bbl-body'>
            {this.state.chosen.map((c, idx) => {
              return (
                <div key={`ch_${idx}`} onClick={this.clickDelete.bind(this, c)}>
                  <Bubble txt={c.name} type='deleter' />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default BubbleChoice
