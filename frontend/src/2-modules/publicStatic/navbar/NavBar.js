import React from 'react'

export default function NavBar ({ items, home }) {
  return (
    <nav className='nav-bar'>
      <NavLogo home={home} />
      <div>
        {items.map(({ href, text }) => (
          <NavItem href={href}>{text}</NavItem>
        ))}
      </div>
    </nav>
  )
}

export function NavLogo ({ home }) {
  return (
    <a className='nav-item nav-logo' href={home}>
      <img alt='logo' src='/assets/branch_logo.png' />
    </a>
  )
}

export function NavItem ({ href, children }) {
  return (
    <a className='nav-item' href={href}>
      {children}
    </a>
  )
}
