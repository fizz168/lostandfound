const express = require('express');
const Claim = require('../models/Claim');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
  const claims = await Claim.findAll({ include: [Item] });
  res.json(claims);
});

router.get('/:id', async (req, res) => {
  const claim = await Claim.findByPk(req.params.id, { include: [Item] });
  if (!claim) return res.status(404).json({ error: 'Not found' });
  res.json(claim);
});

router.post('/', async (req, res) => {
  try {
    const claim = await Claim.create(req.body);
    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
