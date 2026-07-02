const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const data = { ...req.body }
    if (data.password) {
      data.passwordHash = await bcrypt.hash(data.password, 10)
      delete data.password
    }
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
