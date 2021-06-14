import React from 'react'
import { useGlobalContext } from '../context'
import axios from 'axios'
import { toast } from 'react-toastify'

const WorkoutInput = () => {
  const {
    workoutDesc,
    setWorkoutDesc,
    workouts,
    setWorkouts,
    workoutDate,
    currentUserId,
  } = useGlobalContext()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setWorkoutDesc({ ...workoutDesc, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newWorkout = {
      excercise: workoutDesc.excercise,
      date: workoutDate,
      group: workoutDesc.group,
      sets: workoutDesc.sets,
      reps: workoutDesc.reps,
      weight: workoutDesc.weight,
      notes: workoutDesc.notes,
      user_id: currentUserId,
    }
    console.log(newWorkout)
    await axios.post('http://localhost:5000/workouts/new', newWorkout)
    toast.success('Posted a new workout!', {
      position: 'top-center',
      autoClose: 2000,
      draggable: false,
      pauseOnHover: false,
      hideProgressBar: true,
    })
    window.location.reload()
  }

  return (
    <div>
      <h2 className='text-center heading'>Log your workout!</h2>
      <div className='underline-workout-header'></div>
      <div className='text-align-center'>
        <form className='d-block' onSubmit={handleSubmit}>
          <div className='d-flex'>
            <input
              type='text'
              name='group'
              placeholder='Muscle Group'
              className='form-control'
              value={workoutDesc.group}
              onChange={handleChange}
            />
            <input
              type='text'
              name='excercise'
              placeholder='Excercise'
              className='form-control'
              value={workoutDesc.excercise}
              onChange={handleChange}
            />
          </div>

          <div className='d-flex py-1'>
            <input
              type='text'
              name='sets'
              className='form-control'
              placeholder='Sets'
              value={workoutDesc.sets}
              onChange={handleChange}
            />
            <input
              type='text'
              name='reps'
              className='form-control'
              placeholder='Reps'
              value={workoutDesc.reps}
              onChange={handleChange}
            />
            <input
              type='text'
              name='weight'
              className='form-control'
              placeholder='Weight'
              value={workoutDesc.weight}
              onChange={handleChange}
            />
          </div>
          <input
            type='text'
            name='notes'
            className='form-control mb-1'
            placeholder='Notes'
            value={workoutDesc.notes}
            onChange={handleChange}
          />
          <button className='btn btn-primary px-5 workout-btn' type='submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default WorkoutInput
