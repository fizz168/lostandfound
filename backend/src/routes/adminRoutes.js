const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const User = require('../models/User')
const Role = require('../models/Role')
const Claim = require('../models/Claim')
const Activity = require('../models/Activity')
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
      attributes: ['id', 'name', 'email', 'createdAt'],
      include: [{ model: Role, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    })
    const normalized = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.Role?.name || 'user',
      isAdmin: user.Role?.name === 'admin',
      createdAt: user.createdAt,
    }))
    res.json(normalized)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' })
  }
})

router.get('/claims', async (req, res) => {
  try {
    const claims = await Claim.findAll({ include: [Item], order: [['createdAt', 'DESC']] })
    res.json(claims)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch claims.' })
  }
})

router.patch('/claims/:id', async (req, res) => {
  const { status } = req.body
  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' })
  }

  try {
    const claim = await Claim.findByPk(req.params.id, { include: [Item] })
    if (!claim) return res.status(404).json({ error: 'Claim not found.' })

    claim.status = status
    await claim.save()

    const item = claim.Item
    if (status === 'approved' && item) {
      item.status = 'claimed'
      await item.save()
      await Activity.create({ action: 'claim_approved', details: claim.reason || '', itemId: item.id, userName: req.user.name, userEmail: req.user.email })
    }

    if (status === 'denied') {
      await Activity.create({ action: 'claim_denied', details: claim.reason || '', itemId: claim.itemId, userName: req.user.name, userEmail: req.user.email })
    }

    res.json({ message: 'Claim status updated.', claim })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update claim status.' })
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