import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'
import { toast } from 'react-toastify'

const Logout = () => {
  const { setCurrentUserId, setIsAuthenticated } = useGlobalContext()
  const logout = (e) => {
    e.preventDefault()
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    toast.success('Goodbye!', {
      position: 'top-center',
      autoClose: 2000,
      draggable: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
    setCurrentUserId(0)
  }

  useEffect(() => {
    logout()
  }, [])
  return <div></div>
}

export default Logout
