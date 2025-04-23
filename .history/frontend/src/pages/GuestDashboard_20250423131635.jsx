import React from 'react'
import GuestNavbar from '../components/GuestNavbar'
import Guest from '../components/Guest'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Categories from '../components/Categories'

const GuestDashboard = () => {
  return (
    <div>
        <GuestNavbar/>
      < Guest/>
        <div className="hidden lg:block w-72">
        <Categories />
                          </div>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default GuestDashboard