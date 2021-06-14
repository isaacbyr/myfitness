import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useGlobalContext } from './context'
import moment from 'moment'

export const Calender = () => {
  const { date, setDate } = useGlobalContext()

  const changeDate = (e) => {
    // window.location.reload()
    setDate(e)
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <Calendar value={date} onChange={changeDate} />
      </div>
      <p className='text-center pt-3 date-highlight'>
        Date Selected is <b>{moment(date).format('MMMM Do YYYY')}</b>
      </p>
    </>
  )
}

export default Calender
