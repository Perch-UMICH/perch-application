import React from 'react'
import './dashboard.scss'
import { Canvas, LeftPanel, MainPanel, RightPanel, HeaderPanel} from '../../../../1-layouts/Panels'
import SearchBar from './SearchBar'
import Projects from './Projects'
import Groups from './Groups'
import SavedProjects from './SavedProjects'
import RecommendedProjects from './RecommendedProjects'
import RecommendedBlogs from './RecommendedBlogs'
import Resources from './Resources'

export default function Dashboard(props) {
  return (
    <Canvas>
      <HeaderPanel>
        <SearchBar />
      </HeaderPanel>
      <LeftPanel>
        <Projects />
        <Groups />
        <SavedProjects />
      </LeftPanel>
      <MainPanel>
        <RecommendedProjects />
        <RecommendedBlogs />
      </MainPanel>
      <RightPanel>
        <Resources />
      </RightPanel>
    </Canvas>
  )
}
