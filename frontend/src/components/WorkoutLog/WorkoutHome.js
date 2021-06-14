import React from 'react'
import WorkoutCalendar from './WorkoutCalendar'
import WorkoutInput from './WorkoutInput'
import Workouts from './Workouts'

const WorkoutHome = () => {
  return (
    <main className='container'>
      <div className='workout-input-container mt-5 mb-5'>
        <WorkoutInput />
      </div>
      <div className='row'>
        <div className='col-md-7 workouts-container'>
          <Workouts />
        </div>
        <div className='col-md-4 calendar-container'>
          <WorkoutCalendar />
        </div>
      </div>
    </main>
  )
}

export default WorkoutHome
