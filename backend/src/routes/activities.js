const express = require('express');
const Activity = require('../models/Activity');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await Activity.findAll({ include: [Item], order: [['occurredAt','DESC']], limit: 50 });
  res.json(activities);
});

module.exports = router;
