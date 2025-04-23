import React from 'react'
import GuestNavbar from '../components/GuestNavbar'
import Guest from '../components/Guest'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const GuestDashboard = () => {
  return (
    <div>
        <GuestNavbar/>
      < Guest/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default GuestDashboard