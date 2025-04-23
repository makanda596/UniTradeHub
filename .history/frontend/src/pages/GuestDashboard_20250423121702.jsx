import React from 'react'
import GuestNavbar from '../components/GuestNavbar'

const GuestDashboard = ({user}) => {
  return (
    <div>
        <GuestNavbar/>
        <a href='/home'>home</a>
        
    </div>
  )
}

export default GuestDashboard