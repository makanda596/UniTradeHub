import React from 'react'
import GuestNavbar from '../components/GuestNavbar'
import Guest from '../components/Guest'
import Footer from '../components/Footer'
import Categories from '../components/Categories'

const GuestDashboard = () => {
  return (
    <div className='nt-20'>
      <GuestNavbar />

      {/* Main layout section */}
      <div className="lg:flex lg:justify-between lg:items-start">
        <div className="flex-1">
          <Guest />
        </div>

        {/* Categories on the right side on large screens */}
        <div className="hidden lg:block lg:w-72 lg:ml-2">
          <Categories />
        </div>
      </div>

      
      <Footer />
    </div>
  )
}

export default GuestDashboard
