import React, { useState } from 'react';
import { 
  Map, 
  Route, 
  Clock, 
  MapPin, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3
} from 'lucide-react';
import { mockRoutes } from '../../data/mockData';

export default function RouteManagement() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-600 bg-green-100' 
      : 'text-slate-400 bg-white/10';
  };

  const toggleRouteStatus = (routeId: string) => {
    setRoutes(routes.map(route => 
      route.id === routeId 
        ? { ...route, status: route.status === 'active' ? 'inactive' : 'active' }
        : route
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Route Management</h2>
          <p className="text-slate-400">Manage collection routes and optimize schedules</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Route
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Routes</p>
              <p className="text-3xl font-bold text-white">{routes.length}</p>
            </div>
            <Route className="h-8 w-8 text-brand-500" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Active Routes</p>
              <p className="text-3xl font-bold text-green-600">
                {routes.filter(r => r.status === 'active').length}
              </p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Bins</p>
              <p className="text-3xl font-bold text-brand-500">
                {routes.reduce((sum, route) => sum + route.binCount, 0)}
              </p>
            </div>
            <MapPin className="h-8 w-8 text-brand-500" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Avg Duration</p>
              <p className="text-3xl font-bold text-brand-500">
                {Math.round(routes.reduce((sum, route) => sum + route.estimatedDuration, 0) / routes.length)}m
              </p>
            </div>
            <Clock className="h-8 w-8 text-brand-500" />
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div className="glass-panel">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-medium text-white">All Routes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Areas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Bins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Last Optimized
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="glass-panel divide-y divide-gray-200">
              {routes.map((route) => (
                <tr 
                  key={route.id} 
                  className={`hover:bg-white/5 cursor-pointer transition-colors ${
                    selectedRoute === route.id ? 'bg-brand-500/20' : ''
                  }`}
                  onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white">{route.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-400">
                      {route.areas.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {route.estimatedDuration}m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {route.binCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(route.lastOptimized).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRouteStatus(route.id);
                        }}
                        className={`p-1 rounded hover:bg-white/10 ${
                          route.status === 'active' ? 'text-brand-500' : 'text-green-600'
                        }`}
                      >
                        {route.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
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

      {/* Route Details */}
      {selectedRoute && (
        <div className="glass-panel">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-medium text-white">Route Details</h3>
          </div>
          <div className="p-6">
            {(() => {
              const route = routes.find(r => r.id === selectedRoute);
              if (!route) return null;
              
              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white/10 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-slate-400">Interactive Route Map</p>
                          <p className="text-sm text-slate-500">Visual route display would appear here</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        <Settings className="h-5 w-5 mr-2" />
                        Optimize Route
                      </button>
                      <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        View Analytics
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Route Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Name:</span>
                          <span className="font-medium">{route.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="font-medium">{route.estimatedDuration} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Bins:</span>
                          <span className="font-medium">{route.binCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Status:</span>
                          <span className={`font-medium capitalize ${
                            route.status === 'active' ? 'text-green-600' : 'text-slate-400'
                          }`}>
                            {route.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Coverage Areas</h4>
                      <div className="space-y-2">
                        {route.areas.map((area, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
