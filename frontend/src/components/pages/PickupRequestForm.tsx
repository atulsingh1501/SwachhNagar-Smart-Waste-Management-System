import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Truck,
  Send,
  CheckCircle,
  AlertTriangle,
  Weight
} from 'lucide-react';
import { createPickupRequest } from '../../lib/api';

export default function PickupRequestForm() {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    wasteType: 'solid',
    preferredTime: '',
    estimatedWeight: '',
    specialInstructions: '',
    coordinates: { lat: 0, lng: 0 }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get user token from localStorage or context
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to submit a pickup request');
        setIsSubmitting(false);
        return;
      }

      // Get current user info
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const requestData = {
        citizenId: user.id,
        location: formData.location,
        description: formData.description,
        wasteType: formData.wasteType,
        preferredTime: formData.preferredTime,
        coordinates: formData.coordinates,
        estimatedWeight: formData.estimatedWeight || undefined,
        specialInstructions: formData.specialInstructions || undefined
      };

      await createPickupRequest(requestData, token);

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          location: '',
          description: '',
          wasteType: 'solid',
          preferredTime: '',
          estimatedWeight: '',
          specialInstructions: '',
          coordinates: { lat: 0, lng: 0 }
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting pickup request:', error);
      alert('Failed to submit pickup request. Please try again.');
      setIsSubmitting(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2); // Minimum 2 hours from now
    return now.toISOString().slice(0, 16);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pickup Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your pickup request has been received and assigned reference number <strong>#PR-{Date.now().toString().slice(-6)}</strong>
          </p>
          <p className="text-sm text-gray-500">
            You will receive a confirmation call within 1 hour. Expected pickup time: within 24-48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Request Waste Pickup</h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Schedule a pickup for your waste collection. We'll collect it at your preferred time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your address in Vadodara (e.g., 'Alkapuri, Race Course Road')"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="absolute right-3 top-3 text-emerald-600 hover:text-emerald-700"
              >
                Use Current Location
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waste Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Describe the waste you want to dispose (e.g., 'Household waste from kitchen renovation', 'Garden waste and old furniture')"
            />
          </div>

          {/* Waste Type & Estimated Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waste Type *
              </label>
              <select
                required
                value={formData.wasteType}
                onChange={(e) => setFormData(prev => ({ ...prev, wasteType: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="solid">General Waste</option>
                <option value="recyclable">Recyclables (Paper, Plastic, Metal)</option>
                <option value="compost">Organic/Compost</option>
                <option value="hazardous">Hazardous Waste</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Weight (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.estimatedWeight}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedWeight: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Approximate weight"
                />
              </div>
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Pickup Time *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                required
                min={getMinDateTime()}
                value={formData.preferredTime}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 2 hours from now. Business hours: 8 AM - 6 PM
            </p>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={formData.specialInstructions}
              onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Any special handling instructions, access codes, or notes for our collection team"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-xs text-gray-500">
              * Required fields. Standard pickup fee applies. Large items may incur additional charges.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Truck className="h-5 w-5 mr-2" />
              )}
              {isSubmitting ? 'Submitting...' : 'Request Pickup'}
            </button>
          </div>
        </form>
      </div>

      {/* Important Notes */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-blue-800">Important Notes</h3>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Please ensure waste is properly sorted and contained</li>
              <li>• Hazardous waste requires special handling - call Vadodara Municipal Corporation at 1800-XXX-XXXX first</li>
              <li>• Large items (furniture, appliances) may need special scheduling</li>
              <li>• Cancellation policy: 24 hours notice required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
