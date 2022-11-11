import React from 'react'
import logo from './logo-circle.png'

export default function HeaderArea() {
  return (
    <header className='header'>
      <span className='header-label'>В поисках Гренландских китов</span>
      <div className='header-logo'>
        <img src={logo} ></img>
      </div>
    </header>
  )
}
