import React from 'react'
import GuestNavbar from '../components/GuestNavbar'
import Guest from '../components/Guest'
import Footer from '../components/Footer'
import Categories from '../components/Categories'

const GuestDashboard = () => {
  return (
    <div >
      <GuestNavbar />

      <div className="lg:flex lg:justify-between lg:items-start pt-12">
        <div className="flex-1">
          <Guest />
        </div>

        <div className="hidden lg:block lg:w-72 lg:ml-2">
          <Categories />
        </div>
      </div>

      
      <Footer />
    </div>
  )
}

export default GuestDashboard
