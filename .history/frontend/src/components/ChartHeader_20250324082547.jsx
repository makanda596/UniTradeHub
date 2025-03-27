import React from 'react'

const ChartHeader = ({user}) => {
  return (
    <>
    <h1>{user?._id}</h1>
    <div>{user?.username}</div>
      </>
  )
}

export default ChartHeader