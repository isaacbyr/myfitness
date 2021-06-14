const jwt = require('jsonwebtoken')

const jwtGenerator = (id) => {
  const payload = {
    user: id,
  }

  return jwt.sign(payload, 'secret')
}

module.exports = jwtGenerator
