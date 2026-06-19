const express = require('express');
const Item = require('../models/Item');
const Claim = require('../models/Claim');
const Activity = require('../models/Activity');
const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Item.findByPk(req.params.id, { include: [Claim, Activity] });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    // record activity
    await Activity.create({ action: 'item_created', details: item.name, itemId: item.id, userName: item.reporter, userEmail: item.email });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Claim an item: create a Claim record and update item status
router.post('/:id/claim', async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });

  const { claimant = {}, reason } = req.body;

  try {
    const claim = await Claim.create({ claimantName: claimant.name, claimantEmail: claimant.email, reason, itemId: item.id });
    item.status = 'claimed';
    await item.save();
    await Activity.create({ action: 'item_claimed', details: reason || '', itemId: item.id, userName: claimant.name, userEmail: claimant.email });
    res.json({ success: true, item, claim });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
