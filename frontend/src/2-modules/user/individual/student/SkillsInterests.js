import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'
import Bubble from './Bubble'

export default function SkillsInterests ({ owner, tags, skills }) {
  return (
    <div id='user-skills-interests'>
    <h1>Interests & Skills</h1>
      <Editor
        permissions={owner}
        superClick={() => openModal('skills-interests-edit')}
      />
      {!tags.length && !skills.length && (
        <div style={{ color: 'lightgrey', paddingTop: '10px' }}>
          Big nickelback fan
        </div>
      )}
      {tags.map((item, index) => (
        <Bubble key={`${index}-int`} type='interest'>
          {item.name}
        </Bubble>
      ))}

      {skills.map((item, index) => (
        <Bubble key={`${index}-skill`} type='skill'>
          {item.name}
        </Bubble>
      ))}
    </div>
  )
}