import React from 'react'

const Profile = ({user}) => {
  return (
    <>
      <h2> {user?.posts?.productName}</h2>
    <div>{user ? (<h1>{user?.email}</h1>):(<h1>no user found</h1>)} </div>
    </>
  )
}

export default Profile