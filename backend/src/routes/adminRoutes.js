const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const User = require('../models/User')
const { verifyToken, requireAdmin } = require('../middleware/auth')

router.use(verifyToken, requireAdmin)

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll({ order: [['createdAt', 'DESC']] })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items.' })
  }
})

// PATCH item status
router.patch('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item not found.' })
    await item.update({ status: req.body.status })
    res.json({ message: 'Item updated.', item })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item.' })
  }
})

// DELETE item
router.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item not found.' })
    await item.destroy()
    res.json({ message: 'Item deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item.' })
  }
})

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'full_name', 'email', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']],
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' })
  }
})

// DELETE user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found.' })
    await user.destroy()
    res.json({ message: 'User deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' })
  }
})

module.exports = router