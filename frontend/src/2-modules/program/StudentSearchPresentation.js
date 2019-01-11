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
import SearchBar from '../user/individual/dashboard/SearchBar'

export default function (props) {
  let { filters, handleFilterClick, ...search } = props
  return (
    <Canvas>
      <LeftPanel>
        <Filters filters={filters} handleFilterClick={handleFilterClick} />
      </LeftPanel>
      <MainPanel>
        <SearchPanel>
          <SearchBar {...search} />
        </SearchPanel>
        <ResultsPanel>
          <Results {...search} />
        </ResultsPanel>
      </MainPanel>
    </Canvas>
  )
}