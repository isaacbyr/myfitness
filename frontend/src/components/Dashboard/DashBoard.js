import React, { useEffect, useState } from 'react'
import moment from 'moment'

const DashBoard = () => {
  const [allUserData, setAllUserData] = useState([])

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard')
      const JSONres = await response.json()
      console.log(JSONres)
      setAllUserData(JSONres)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <section className='container'>
      <div className='row justify-content center'>
        <div className='col-md-6 offset-3'>
          <h2 className='text-center mb-3 dashboard-header mt-5'>
            Recent Activity
          </h2>
          <div className='all-users'>
            {allUserData.map((userData) => {
              const { id, user_name, date, name, type } = userData
              return (
                <div className='user-activity' key={id}>
                  <div className='d-flex'>
                    <h6 className='mt-1'>
                      {user_name}
                      {type == 'Breakfast' ||
                      type == 'Lunch' ||
                      type == 'Dinner'
                        ? ' posted in their foodlog!'
                        : ' posted a new workout!'}
                    </h6>
                    <span className='dashboard-date'>
                      {moment(date).format('MMMM Do YYYY')}
                    </span>
                  </div>

                  <div className='underline-dashboard'></div>
                  <p>{name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashBoard
