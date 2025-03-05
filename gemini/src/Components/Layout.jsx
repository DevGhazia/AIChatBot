import React from 'react'
import Hero from './Hero'
import Side from './Side'

const Layout = () => {
  return (
    <div className="mainContainer">
        <Side />
        <Hero />
    </div>
  )
}

export default Layout