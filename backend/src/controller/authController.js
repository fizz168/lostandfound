const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Role = require('../models/Role')

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  try {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: ['name'] }],
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    let isMatch = false
    if (user.passwordHash && typeof user.passwordHash === 'string') {
      const isBcryptHash = user.passwordHash.startsWith('$2a$') || user.passwordHash.startsWith('$2b$') || user.passwordHash.startsWith('$2y$')
      if (isBcryptHash) {
        isMatch = await bcrypt.compare(password, user.passwordHash)
      } else {
        isMatch = password === user.passwordHash
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const role = user.Role?.name || 'user'
    const isAdmin = role === 'admin'

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured')
      return res.status(500).json({ error: 'Server error: JWT secret is not configured.' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role, isAdmin },
      jwtSecret,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        isAdmin,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error during login.' })
  }
}

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, attributes: ['name'] }],
      attributes: ['id', 'name', 'email', 'roleId'],
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const role = user.Role?.name || 'user'
    const isAdmin = role === 'admin'

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      isAdmin,
    })
  } catch (err) {
    console.error('Get profile error:', err)
    res.status(500).json({ error: 'Failed to fetch user profile.' })
  }
}

// POST /api/auth/register
const register = async (req, res) => {
  const { full_name, email, password } = req.body

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const existing = await User.findOne({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    await User.create({ name: full_name, email, passwordHash: hashed, roleId: 1 })

    res.status(201).json({ message: 'Account created. Please log in.' })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Server error during registration.' })
  }
}

module.exports = { login, register, me }