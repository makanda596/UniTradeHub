import React from 'react'
import GuestNavbar from '../components/GuestNavbar'

const GuestDashboard = ({user}) => {
  return (
    <div>
        <GuestNavbar/>
        <a href='/home'>home</a>
                                <AllPosts user={user} />
        
    </div>
  )
}

export default GuestDashboard