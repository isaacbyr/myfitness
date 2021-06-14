import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import moment from 'moment'
import { TiDelete } from 'react-icons/ti'
import axios from 'axios'
import WorkoutNotes from './WorkoutNotes'
import { toast } from 'react-toastify'

const Workouts = () => {
  const { workoutDate, workouts, setWorkouts, currentUserId } =
    useGlobalContext()

  console.log(workoutDate)
  const handleDelete = async (id) => {
    console.log('DELETING ITEM')
    await axios.delete(`http://localhost:5000/workouts/delete/${id}`)
    toast.success('Deleted a workout!', {
      position: 'top-center',
      autoClose: 2000,
      draggable: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
    window.location.reload()
  }

  const fetchData = async (workoutDate) => {
    console.log('FETCHING WORKOUTS')
    const response = await fetch(
      `http://localhost:5000/workouts/getall/${workoutDate}/${currentUserId}`
    )
    const data = await response.json()
    console.log(data)
    setWorkouts(data)
  }

  useEffect(() => {
    fetchData(workoutDate)
  }, [workoutDate])

  return (
    <section>
      <h2 className='list-header text-center'>
        {moment(workoutDate).format('MMMM Do YYYY')}
      </h2>
      <div className='underline-workout'></div>
      <div>
        <table className='table-list table'>
          <thead>
            <tr>
              <th>Excercise</th>
              <th>Muscle Group</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => {
              return (
                <tr key={workout.id}>
                  <td className='table-item'>{workout.excercise}</td>
                  <td className='table-item'>{workout.muscle_group}</td>
                  <td className='table-item'>{workout.num_sets}</td>
                  <td className='table-item'>{workout.reps}</td>
                  <td className='table-item'>{workout.weight}</td>
                  <td className='table-item'>
                    <WorkoutNotes notes={workout.notes} />
                  </td>
                  <td
                    className='delete-table-item'
                    onClick={() => handleDelete(workout.id)}
                  >
                    <TiDelete />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Workouts
