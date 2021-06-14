import './App.css'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Error from './components/Error'
import Navbar from './components/Navbar'
import WorkoutHome from './components/WorkoutLog/WorkoutHome'
import Login from './components/Users/Login'
import DashBoard from './components/Dashboard/DashBoard'
import FitbitHome from '../src/components/Fitbit/FItbitHome'
import Register from './components/Users/Register'
import Logout from './components/Users/Logout'
import { useGlobalContext } from './components/context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext()
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <DashBoard />
        </Route>
        <Route exact path='/foodlog'>
          {isAuthenticated ? <Home /> : <Redirect to='/users/login' />}
        </Route>
        <Route path='/workoutlog'>
          {isAuthenticated ? <WorkoutHome /> : <Redirect to='/users/login' />}
        </Route>
        <Route path='/users/login'>
          {!isAuthenticated ? <Login /> : <Redirect to='/' />}
        </Route>
        <Route path='/fitbit'>
          <FitbitHome />
        </Route>
        <Route path='/users/register'>
          {!isAuthenticated ? <Register /> : <Redirect to='/' />}
        </Route>
        <Route path='/users/logout'>
          {!isAuthenticated ? <Redirect to='/' /> : <Logout />}
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </>
  )
}

export default App
