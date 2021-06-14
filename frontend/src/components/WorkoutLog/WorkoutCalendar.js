import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import { useGlobalContext } from '../context'

const WorkoutCalendar = () => {
  const { workoutDate, setWorkoutDate } = useGlobalContext()

  const changeDate = (e) => {
    setWorkoutDate(e)
  }
  return (
    <>
      <div className='d-flex justify-content-center'>
        <Calendar value={workoutDate} onChange={changeDate} />
      </div>
      <p className='text-center pt-3 date-highlight'>
        Date Selected is <b>{moment(workoutDate).format('MMMM Do YYYY')}</b>
      </p>
    </>
  )
}

export default WorkoutCalendar
