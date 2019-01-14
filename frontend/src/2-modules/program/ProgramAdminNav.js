import React from 'react'
import {
  isLoggedIn,
  getCurrentUserId,
  isStudent,
  isFaculty,
  getCurrentFacultyId /* getFacultyLabs */
} from '../../backend/index.js'
import './ProgramAdminNav.scss'
import { Link } from 'react-router-dom'

function ProgramAdminNav ({match}) {
  // figure out homepage
  let homeLink = '/'
  if (isStudent()) homeLink = `/student-profile/${getCurrentUserId()}`
  else if (isFaculty()) homeLink = `/prof/${getCurrentFacultyId()}`

  // figure out nav items to show
  let navItems = []
  if (isLoggedIn()) {
    navItems.push({ to: '/projects', text: 'Projects' })
    navItems.push({ to: '/students', text: 'Students' })
    navItems.push({ to: '/match', text: 'Match' })
    navItems.push({ to: '/settings', text: 'Settings' })
  }
  else {
    navItems.push({ to: '/about', text: 'About' })
    navItems.push({ to: '/join', text: 'Join The Team' })
    navItems.push({ to: '/login', text: 'Login' })
  }

  return <ProgramAdminNavBar match={match} items={navItems} home={homeLink} />
}

function ProgramAdminNavBar ({ match, items, home }) {
  return (
    <nav className='program-admin-nav-bar'>
      <div>
        {items.map(({ to, text }) => (
          <ProgramAdminNavItem match={match} to={to}>{text}</ProgramAdminNavItem>
        ))}
      </div>
    </nav>
  )
}

function ProgramAdminNavItem ({ match, to, children }) {
  return (
    <Link className='program-admin-nav-item' to={match.url + to}>
      {children}
    </Link>
  )
}

export default ProgramAdminNav