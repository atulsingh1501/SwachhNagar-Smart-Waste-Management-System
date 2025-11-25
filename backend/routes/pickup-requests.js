const express = require('express');
const PickupRequest = require('../models/PickupRequest');
const router = express.Router();

console.log('Pickup requests router loaded successfully');

// Get all pickup requests (admin/staff only)
router.get('/', async (req, res) => {
  try {
    const requests = await PickupRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pickup requests for a specific citizen
router.get('/citizen/:citizenId', async (req, res) => {
  try {
    const requests = await PickupRequest.find({ citizenId: req.params.citizenId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new pickup request
router.post('/', async (req, res) => {
  try {
    const requestData = { ...req.body };
    if (requestData.preferredTime) {
      requestData.preferredTime = new Date(requestData.preferredTime);
    }
    const request = new PickupRequest(requestData);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get pickup request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await PickupRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Pickup request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update pickup request
router.put('/:id', async (req, res) => {
  try {
    const request = await PickupRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ error: 'Pickup request not found' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete pickup request
router.delete('/:id', async (req, res) => {
  try {
    const request = await PickupRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ error: 'Pickup request not found' });
    res.json({ message: 'Pickup request deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update request status (for staff/admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const request = await PickupRequest.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    if (!request) return res.status(404).json({ error: 'Pickup request not found' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
