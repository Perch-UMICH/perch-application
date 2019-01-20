import React from 'react'
import Results from './Results'
import Filters from './Filters'
import {
  Canvas,
  LeftPanel,
  SearchPanel,
  ResultsPanel,
  MainPanel
} from '../../1-layouts/SearchPage'
import {TextInput} from '../../3-utils/Inputs'
export default function (props) {
  let { filters, handleFilterClick, updateParent, executeSearch, ...results } = props
  return (
    <Canvas>
      <LeftPanel>
        <Filters filters={filters} handleFilterClick={handleFilterClick} />
      </LeftPanel>
      <MainPanel>
        <SearchPanel>
          <TextInput 
            type='text'
            name='query'
            label='press enter to search'
            updateParent={updateParent}
            onEnter={executeSearch}
          />
        </SearchPanel>
        <ResultsPanel>
          <Results {...results} />
        </ResultsPanel>
      </MainPanel>
    </Canvas>
  )
}