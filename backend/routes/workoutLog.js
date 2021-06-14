const express = require('express')
const router = express.Router()
const pool = require('../models/database')

router.post('/new', async (req, res) => {
  const { excercise, group, sets, reps, weight, notes, user_id } = req.body
  const newWorkout = await pool.query(
    'INSERT INTO workoutlog (muscle_group, excercise, reps, num_sets, weight, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [group, excercise, reps, sets, weight, notes, user_id]
  )
})

router.get('/getall/:date/:user_id', async (req, res) => {
  const { date, user_id } = req.params
  const formattedDate = formatDate(date)
  const allWorkouts = await pool.query(
    'SELECT * FROM workoutlog where DATE(date) = $1 AND user_id = $2',
    [formattedDate, user_id]
  )
  res.json(allWorkouts.rows)
})

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  const deletedItem = await pool.query('DELETE FROM workoutlog WHERE id = $1', [
    id,
  ])
  console.log(deletedItem)
})

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

module.exports.workoutRouter = router
