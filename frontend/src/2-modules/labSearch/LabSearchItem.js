import React, { Component } from 'react'
import LabSearchProject from './LabSearchProject'
import ExpanderIcons from '../utilities/ExpanderIcons'
import './LabSearchItem.css'

class LabSearchItem extends Component {
  constructor (props) {
    super(props)
    this.expandProjects = this.expandProjects.bind(this)
    this.comparePosIds.bind(this)
    this.default_pics = [
      'batman',
      'boba',
      'spock',
      'superman',
      'wonder_woman',
      'wonder_woman',
      'yoda'
    ]
    this.pic = this.default_pics[
      Math.floor(Math.random() * this.default_pics.length)
    ]
  }

  componentDidMount () {
    // console.log(this.props.saved_labs)
  }

  comparePosIds (pos_ids) {
    if (pos_ids && pos_ids.length) {
      pos_ids.map(pos => {
        if (pos == this.state.position.id) {
          this.setState({ submitted: true })
        }
      })
    }
  }

  expandProjects () {
    let toggleExpanderIcons = () => {
      let lab_srch_item = document.getElementById(
        `lab_srch_item_${this.props.name}`
      )
      let expanderIcons =
        lab_srch_item.children[lab_srch_item.children.length - 1]

      expanderIcons.classList.toggle('active-blue')
    }

    let numProjects = document.getElementById(
      `lab-srch-item-num-projects_${this.props.name}`
    )
    numProjects.classList.toggle('active-blue-bg')

    let expansion = document.getElementById(
      `lab_srch_expansion_${this.props.name}`
    )
    expansion.classList.toggle('hide-projects')
    toggleExpanderIcons()
  }

  render () {
    var all_projects = []
    this.props.positions.map(position => {
      let urop = position.is_urop_project
      let saved = false
      let submitted = false
      let pos_ids = this.props.positions_applied
      if (pos_ids && pos_ids.length) {
        pos_ids.map(pos => {
          if (pos == position.id) submitted = true
        })
      }
      for (var item in this.props.saved_labs) {
        if (position.id == this.props.saved_labs[item].id) saved = true
      }
      all_projects.push(
        <LabSearchProject
          key={position.id}
          id={position.lab_id}
          position={position}
          project_id={position.id}
          saved={saved}
          title={position.title}
          spots='MISSING'
          description={position.description}
          submitted={submitted}
          updateProjects={r => r}
          urop
        />
      )
    })

    let {name, id, dept, rsrch, description, positions} = this.props
    return (
      <div className='lab-srch-item-container shadow'>
        <div
          id={`lab_srch_expansion_${name}`}
          className='lab-srch-item-expansion'
        >
          {all_projects}
          <f className="lab-srch-name">The Orthopedics Research Group</f>
        </div>
      </div>
    )
  }
}

export default LabSearchItem
