import React from 'react'
import GuestNavbar from '../components/GuestNavbar'
import Guest from '../components/Guest'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Categories from '../components/Categories'

const GuestDashboard = () => {
  return (
    <div>
      <GuestNavbar />

      {/* Main layout section */}
      <div className="lg:flex lg:justify-between lg:items-start">
        <div className="flex-0">
          <Guest />
        </div>

        {/* Categories on the right side on large screens */}
        <div className="hidden lg:block lg:w-72 lg:ml-2">
          <Categories />
        </div>
      </div>

      <Contact />
      <Footer />
    </div>
  )
}

export default GuestDashboard
