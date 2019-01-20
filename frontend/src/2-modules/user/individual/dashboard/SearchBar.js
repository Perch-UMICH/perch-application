import React from 'react'
import {TextInput, SubmitInput, InputRow} from '../../../../3-utils/Inputs'
export default function Dashboard({updateParent, executeSearch}) {
  return (
    <div id='search-bar'>
      <TextInput 
        type='text'
        name='query'
        label='Search'
        updateParent={updateParent}
        onEnter={executeSearch}
      />
    </div>
  )
}
