import React from 'react'
import {TextInput, SubmitInput, InputRow} from '../../../../3-utils/Inputs'
export default function Dashboard({updateParent, executeSearch}) {
  return (
    <div id='search-bar'>
      <div id='search-input'>
        <TextInput 
          type='text'
          name='query'
          label='Search'
          updateParent={updateParent}
        />
      </div>
      <div id='search-submit'>
        <SubmitInput 
          onClick={executeSearch}
        />
      </div>

    </div>
  )
}
