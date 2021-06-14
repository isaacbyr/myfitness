import React from 'react'
import ListComponent from './ListComponent'
import Calender from './Calender'
import Input from './Input'
import Recents from './Recents'
import { useGlobalContext } from './context'

const Home = () => {
  const { recentSearches } = useGlobalContext()
  return (
    <main className='container-fluid'>
      <Input />
      <div className='row justify-content-center'>
        <div className='col-md-2 recent-container'>
          <Recents />
        </div>

        <div className='col-md-5 list-container'>
          <ListComponent />
        </div>
        <div className='col-md-4 calendar-container'>
          <Calender />
        </div>
      </div>
    </main>
  )
}

export default Home
