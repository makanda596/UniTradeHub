import React from 'react'

const ChartHeader = ({ recieverId, userId }) => {
  return (
    <>
          <h1>{recieverId}</h1>
          <p>{userId}</p>
    {/* <div>{user?.username}</div> */}
      </>
  )
}

export default ChartHeader