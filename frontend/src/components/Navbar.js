import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setCurrentUserId } =
    useGlobalContext()

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

  return (
    <nav className='navbar sticky-top navbar-expand-lg navbar-light'>
      <div className='container-fluid d-flex'>
        <a className='navbar-brand' href='/'>
          MyFitness
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/foodlog'>
                LOG FOOD
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/workoutlog'>
                LOG WORKOUT
              </Link>
            </li>
            {!isAuthenticated ? (
              <div className='d-flex'>
                <li className='nav-item'>
                  <Link className='nav-link nav-login' to='/users/login'>
                    LOGIN
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link nav-login' to='/users/register'>
                    REGISTER
                  </Link>
                </li>
              </div>
            ) : (
              <li className='nav-item' onClick={(e) => logout(e)}>
                <Link className='nav-link nav-login' to='/users/login'>
                  LOGOUT
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
