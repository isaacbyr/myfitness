const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const jwtToken = req.header('token')

  if (!jwtToken) {
    res.status(401).send('Not Authorized')
  }
  try {
    const payload = jwt.verify(jwtToken, 'secret')
    req.user = payload.user
    next()
  } catch (e) {
    console.log(e.mesage)
    res.status(403).json('Not Authorized')
  }
}
