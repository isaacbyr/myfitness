const express = require('express')
const router = express.Router()
const pool = require('../models/database')

router.post('/newItem', async (req, res) => {
  const { name, nf_calories, nf_protein, tod, date, user_id } = req.body
  if (name) {
    const newItem = await pool.query(
      'INSERT INTO foodlog (food_name, category, protein, calories, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, tod, nf_protein, nf_calories, date, user_id]
    )
    console.log(newItem)
  }
})

router.get('/finditem/:name/:id', async (req, res) => {
  const { name, currentUserId } = req.params
  const findItem = await pool.query(
    'SELECT * FROM foodlog WHERE food_name LIKE $1 LIMIT 1',
    [name]
  )
  const newItem = await pool.query(
    'INSERT INTO foodlog (food_name, category, protein, calories, user_id) VALUES ($1, $2, $3, $4, $5)',
    [
      findItem.rows[0].food_name,
      findItem.rows[0].category,
      findItem.rows[0].protein,
      findItem.rows[0].calories,
      currentUserId,
    ]
  )
})

router.get('/recents/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  const recents = await pool.query(
    'SELECT DISTINCT ON (food_name) food_name FROM foodlog WHERE user_id = $1 ORDER BY food_name, DATE(date)',
    [id]
  )
  res.json(recents.rows)
})

router.get('/allitems/:date/:user_id', async (req, res) => {
  const { date, user_id } = req.params

  const formattedDate = formatDate(date)

  const allItems = await pool.query(
    `SELECT * FROM foodlog WHERE DATE(date) = $1 AND user_id = $2`,
    [formattedDate, user_id]
  )
  const totals = await pool.query(
    `SELECT SUM(protein) as protein, SUM(calories) as calories FROM foodlog WHERE DATE(date) = $1 AND user_id = $2`,
    [formattedDate, user_id]
  )
  res.json({
    allItems: allItems.rows,
    totals: totals.rows,
  })
})

router.delete('/deleteitem/:id', async (req, res) => {
  const { id } = req.params
  const deletedItem = await pool.query('DELETE FROM foodlog WHERE id = $1', [
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

module.exports.foodLogRouter = router
