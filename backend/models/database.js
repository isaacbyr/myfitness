const Pool = require('pg').Pool

const pool = new Pool({
  user: 'isaacbyron',
  password: '666',
  host: 'localhost',
  port: 5432,
  database: 'myfitness',
})

module.exports = pool
