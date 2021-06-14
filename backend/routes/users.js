const express = require('express')
const router = express.Router()
const pool = require('../models/database')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // if user exists throw err
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])

    if (user.rows.length !== 0) {
      return res.status(401).json('User Already Exists')
    }

    // hash password if does not exist
    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    // insert into db
    const newUser = await pool.query(
      'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    )

    //generating JWTtoken
    const token = jwtGenerator(newUser.rows[0].id)

    res.json({ token })
  } catch (e) {
    console.log(e.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // check if user doesnt exist
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])

    if (user.rows.length === 0) {
      return res.status(401).json('Password or email is incorrect')
    }

    // check if passwords match
    const validPassword = await bcrypt.compare(password, user.rows[0].password)

    if (!validPassword) {
      return res.status(401).json('Email or Password is Incorrect')
    } else {
      const token = jwtGenerator(user.rows[0].id)
      res.json({ token, id: user.rows[0].id })
    }
  } catch (e) {
    console.log(e.message)
  }
})

module.exports.userRouter = router
