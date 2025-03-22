import React from 'react'

const Profile = ({user}) => {
  return (
    <div>{user?.email} </div>
  )
}

export default Profile