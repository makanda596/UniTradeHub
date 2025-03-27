import React from 'react'

const ChartHeader = ({ recieverId }) => {
  return (
    <>
          <h1>{recieverId?._id}</h1>
    {/* <div>{user?.username}</div> */}
      </>
  )
}

export default ChartHeader