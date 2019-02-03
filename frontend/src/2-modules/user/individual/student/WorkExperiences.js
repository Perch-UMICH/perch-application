import React, { Component } from 'react'
import ExpanderIcons from '../../../utilities/ExpanderIcons'
import Editor from '../../../utilities/Editor'
import styles from './WorkExperiences.module.scss'
export default class WorkExperiences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showExpander: false,
      description: ''
    }
  }

  componentDidMount () {
    if (this.state.description.length >= 250) {
      this.setState({ showExpander: true })
    }
  }

  expand () {
    document
      .getElementById(`user-work-description-${this.props.title}`)
      .classList.toggle('expand')
  }

  render () {
    let { experiences } = this.props
    console.log('exp', this.props)
    return (
      <div className={styles.workExperiences}>
        <div className={styles.title}>Experience</div>
        <div className={styles.body}>
          {experiences.map(exp => (
            <Experience {...exp} />
          ))}
          {!experiences.length && (
            <div style={{ padding: '10px 20px', color: 'lightgrey' }}>
              Freelance netflix reviewer
            </div>
          )}
        </div>
        
        <Editor
          permissions={this.props.owner}
          superClick={() => alert('todo')}
        />
      </div>
    )
  }
}

function Experience (props) {
  console.log(props)
  return (
    <div>
      <div>{props.title}</div>
    </div>
  )
}
