const express = require('express');
const CitizenReport = require('../models/CitizenReport');
const router = express.Router();

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await CitizenReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { analyzeCitizenReport } = require('../utils/ai');

// Create a new report
router.post('/', async (req, res) => {
  try {
    const reportData = req.body;
    
    // Use AI to analyze the report
    const aiAnalysis = await analyzeCitizenReport(reportData.description || '', reportData.location || '');
    
    // Override priority with AI suggestion if provided, and save the AI summary
    if (aiAnalysis.aiSuggestedPriority && ['low', 'medium', 'high'].includes(aiAnalysis.aiSuggestedPriority.toLowerCase())) {
        reportData.priority = aiAnalysis.aiSuggestedPriority.toLowerCase();
    }
    reportData.aiSummary = aiAnalysis.aiSummary;

    const report = new CitizenReport(reportData);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await CitizenReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update report
router.put('/:id', async (req, res) => {
  try {
    const report = await CitizenReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await CitizenReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
