import React from 'react'

const Profile = ({user}) => {
  return (
    <>
    {user?.posts?.productName}
    <div>{user ? (<h1>{user?.email}</h1>):(<h1>no user found</h1>)} </div>
    </>
  )
}

export default Profile