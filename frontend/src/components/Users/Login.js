import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { toast } from 'react-toastify'

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  })

  const {
    isAuthenticated,
    setIsAuthenticated,
    currentUserId,
    setCurrentUserId,
  } = useGlobalContext()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserLogin({ ...userLogin, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userLogin),
      })
      const JSONres = await response.json()
      if (JSONres.token) {
        localStorage.setItem('token', JSONres.token)
        toast.success('Successfully logged in!', {
          position: 'top-center',
          autoClose: 2000,
          draggable: false,
          pauseOnHover: false,
          hideProgressBar: true,
        })
        setCurrentUserId(JSONres.id)
        setIsAuthenticated(true)
      } else {
        toast.error('Wrong email or password', {
          position: 'top-center',
          autoClose: 2000,
          draggable: false,
          pauseOnHover: false,
          hideProgressBar: true,
        })
      }
    } catch (e) {
      toast.error('Wrong email or password', {
        position: 'top-center',
        autoClose: 2000,
        draggable: false,
        pauseOnHover: false,
        hideProgressBar: true,
      })
      console.log(e.message)
    }
  }

  return (
    <div className='row justify-content-center login-container'>
      <div className='col-3 m-auto'>
        <h2 className='text-center'>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            id='email'
            className='form-control mb-2'
            value={userLogin.email}
            onChange={handleChange}
          />
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            name='password'
            id='password'
            value={userLogin.password}
            onChange={handleChange}
          />
          <button className='btn btn-primary px-md-5 px-2 mt-3'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
