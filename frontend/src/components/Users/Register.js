import { useGlobalContext } from '../context'
import React, { useState } from 'react'

const Register = () => {
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { isAuthenticated, setIsAuthenticated } = useGlobalContext()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserRegister({ ...userRegister, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userRegister),
      })
      const JSONres = await response.json()
      if (JSONres) {
        localStorage.setItem('token', JSONres.token)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-4 m-auto'>
        <h2 className='text-center mt-5'>Sign up!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='John Doe'
            className='form-control mb-2'
            value={userRegister.name}
            onChange={handleChange}
          />
          <input
            type='email'
            name='email'
            id='email'
            placeholder='JohnDoe@gmail.com'
            className='form-control mb-2'
            value={userRegister.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            id='password'
            className='form-control mb-2'
            placeholder='Password'
            value={userRegister.password}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='btn btn-primary btn-dark btn-block mt-3'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
