import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h2>Address Does Not Exist</h2>
      <Link to='/home'>Home</Link>
    </div>
  )
}

export default Error
