import React from 'react'
import { CheckboxInput } from '../../3-utils/Inputs'

export default function ({ filters, handleFilterClick }) {
  filters = Object.keys(filters).map(k => [k, filters[k]])
  let TYPE = 0
  let OPTIONS = 1
  return (
    <div className='filters'>
      {filters.map(f => (
        <Filter
          label={f[TYPE]}
          options={f[OPTIONS]}
          handleFilterClick={handleFilterClick}
        />
      ))}
    </div>
  )
}

function Filter ({ label, options, handleFilterClick }) {
  return (
    <div>
      <h1>{label}</h1>
      <div className='options'>
        {options.sort().map(o => (
          <CheckboxInput
            onClick={e => handleFilterClick(e.target.checked, label, o)}
          >
            {o}
          </CheckboxInput>
        ))}
      </div>
    </div>
  )
}
