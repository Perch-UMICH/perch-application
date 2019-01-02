import React from 'react'
import { CheckboxInput } from '../../3-utils/Inputs'

export default function (props) {
  let filters = Object.keys(props).map(k => [k, props[k]])
  let TYPE = 0
  let OPTIONS = 1
  return (
    <div className='filters'>
      {filters.map(f => (
        <Filter label={f[TYPE]} options={f[OPTIONS]} />
      ))}
    </div>
  )
}

function Filter ({ label, options }) {
  return (
    <div>
      <h1>{label}</h1>
      <div className='options'>
        {options.sort().map(o => (
          <CheckboxInput onClick={r => null}>{o}</CheckboxInput>
        ))}
      </div>
    </div>
  )
}
