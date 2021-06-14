const express = require('express')
const app = express()
const cors = require('cors')
const { foodLogRouter } = require('./routes/foodLog')
const { workoutRouter } = require('../backend/routes/workoutLog')
const { dashboardRouter } = require('./routes/dashboard')
const { userRouter } = require('../backend/routes/users')

app.use(cors())
app.use(express.json())

app.use('/', foodLogRouter)
app.use('/workouts', workoutRouter)
app.use('/users', userRouter)
app.use('/dashboard', dashboardRouter)

app.listen(5000, () => {
  console.log('LISTENING ON PORT 5000')
})
