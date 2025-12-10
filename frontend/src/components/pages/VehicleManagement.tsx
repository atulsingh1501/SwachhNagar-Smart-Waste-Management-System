import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  MapPin,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';

export default function VehicleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: vehicles, loading, error } = useApiQuery('vehicles', {
    order: ['created_at', { ascending: false }]
  });

  const { data: routes } = useApiQuery('routes');

  const { update: updateVehicle, loading: updating } = useApiMutation('vehicles');

  const filteredVehicles = vehicles?.filter(vehicle => {
    const matchesSearch = vehicle.plate_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-brand-500 bg-orange-100';
      case 'inactive': return 'text-slate-400 bg-white/10';
      default: return 'text-slate-400 bg-white/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Wrench className="h-4 w-4" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleStatusChange = async (vehicleId: string, newStatus: string) => {
    try {
      await updateVehicle(vehicleId, { status: newStatus as any });
    } catch (error) {
      console.error('Error updating vehicle status:', error);
    }
  };

  const getRouteName = (routeId: string | null) => {
    if (!routeId) return 'Unassigned';
    const route = routes?.find(r => r.id === routeId);
    return route?.name || 'Unknown Route';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-brand-500/20 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading vehicles: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Vehicle Management</h2>
          <p className="text-slate-400">Manage fleet vehicles and their assignments</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Vehicle
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Vehicles</p>
              <p className="text-3xl font-bold text-white">{vehicles?.length || 0}</p>
            </div>
            <Truck className="h-8 w-8 text-brand-500" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {vehicles?.filter(v => v.status === 'active').length || 0}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Maintenance</p>
              <p className="text-3xl font-bold text-brand-500">
                {vehicles?.filter(v => v.status === 'maintenance').length || 0}
              </p>
            </div>
            <Wrench className="h-8 w-8 text-brand-500" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Capacity</p>
              <p className="text-3xl font-bold text-brand-500">
                {vehicles?.reduce((sum, v) => sum + v.capacity, 0).toLocaleString() || 0}kg
              </p>
            </div>
            <Truck className="h-8 w-8 text-brand-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles by plate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="glass-panel">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-medium text-white">
            Vehicles ({filteredVehicles.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Assigned Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="glass-panel divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-white/10 p-2 rounded-full">
                        <Truck className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{vehicle.plate_number}</div>
                        <div className="text-sm text-slate-500">ID: {vehicle.id.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={vehicle.status}
                      onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                      disabled={updating}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${getStatusColor(vehicle.status)} flex items-center`}
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {vehicle.capacity.toLocaleString()} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {getRouteName(vehicle.assigned_route)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {vehicle.current_location ? (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-green-600">Live</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unknown</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {vehicle.last_maintenance ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(vehicle.last_maintenance).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">Never</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-brand-500 hover:bg-blue-100 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-brand-500 hover:bg-red-100 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

