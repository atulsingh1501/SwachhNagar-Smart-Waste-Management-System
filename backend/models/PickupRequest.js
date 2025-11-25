const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  citizenId: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  wasteType: { type: String, enum: ['solid', 'recyclable', 'compost', 'hazardous'], required: true },
  preferredTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'scheduled', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  coordinates: {
    lat: Number,
    lng: Number
  },
  estimatedWeight: { type: Number, min: 0 }, // in kg
  specialInstructions: String,
  assignedStaff: String,
  scheduledDate: Date,
  completedAt: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);
