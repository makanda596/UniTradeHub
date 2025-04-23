import React from 'react'
import GuestNavbar from '../components/GuestNavbar'
import Guest from '../components/Guest'

const GuestDashboard = () => {
  return (
    <div>
        <GuestNavbar/>
        <a href='/home'>home</a>
      < Guest/>
    </div>
  )
}

export default GuestDashboard