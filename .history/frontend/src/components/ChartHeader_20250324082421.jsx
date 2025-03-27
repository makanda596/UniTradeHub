import React from 'react'

const ChartHeader = ({user}) => {
  return (
    <div>{user?.username}</div>
  )
}

export default ChartHeader