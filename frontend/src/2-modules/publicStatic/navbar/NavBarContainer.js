import React from 'react'
import {
  isLoggedIn,
  getCurrentUserId,
  isStudent,
  isFaculty,
  getCurrentFacultyId /* getFacultyLabs */
} from '../../../helper.js'
import './NavBar.scss'
import NavBar  from './NavBar'

function NavBarContainer () {
  // figure out homepage
  let homeLink = '/'
  if (isStudent()) homeLink = `/student-profile/${getCurrentUserId()}`
  else if (isFaculty()) homeLink = `/prof/${getCurrentFacultyId()}`

  // figure out nav items to show
  let navItems = []
  if (isLoggedIn()) {
    navItems.push({ href: homeLink, text: 'Profile' })
    navItems.push({ href: '/lab-match', text: 'Projectbook' })
    if (isStudent()) { navItems.push({ href: '/dashboard', text: 'Your Projects' }) }
    navItems.push({ href: '/help', text: 'Help' })
    navItems.push({ href: '/settings', text: 'Settings' })
    navItems.push({ href: '/logout', text: 'Logout' })
  }
  else {
    navItems.push({ href: '/about', text: 'About' })
    navItems.push({ href: '/join', text: 'Join The Team' })
    navItems.push({ href: '/login', text: 'Login' })
  }

  return <NavBar items={navItems} home={homeLink} />
}

export default NavBarContainer
