const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided.' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token.' })
  }
}

const requireAdmin = (req, res, next) => {
  const isAdmin = req.user?.role === 'admin' || req.user?.isAdmin
  if (!isAdmin) {
    return res.status(403).json({ error: 'Admins only.' })
  }
  next()
}

module.exports = { verifyToken, requireAdmin }