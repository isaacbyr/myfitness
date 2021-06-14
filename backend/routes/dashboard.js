const express = require('express')
const router = express.Router()
const pool = require('../models/database')
const authenticate = require('../middleware/authenticate')

router.get('/', async (req, res) => {
  try {
    const data = await pool.query(
      'SELECT excercise AS name, date, muscle_group AS type, user_id, users.user_name FROM workoutlog LEFT JOIN users ON workoutlog.user_id = users.id UNION SELECT food_name, date, category, user_id, users.user_name FROM foodlog LEFT JOIN users ON foodlog.user_id = users.id ORDER BY date DESC'
    )
    res.json(data.rows)
  } catch (e) {
    console.log(e.message)
  }
})

module.exports.dashboardRouter = router
