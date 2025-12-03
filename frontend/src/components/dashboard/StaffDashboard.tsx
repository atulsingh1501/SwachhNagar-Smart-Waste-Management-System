import React from 'react';
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Navigation,
  Truck,
  FileText
} from 'lucide-react';
import { mockCollections } from '../../data/mockData';

export default function StaffDashboard() {
  const todaysTasks = mockCollections.filter(c => 
    new Date(c.scheduledTime).toDateString() === new Date().toDateString()
  );

  const stats = {
    assignedTasks: todaysTasks.length,
    completedTasks: todaysTasks.filter(t => t.status === 'completed').length,
    pendingTasks: todaysTasks.filter(t => t.status === 'pending').length,
    inProgressTasks: todaysTasks.filter(t => t.status === 'in-progress').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-brand-500 bg-blue-100';
      case 'pending': return 'text-brand-500 bg-orange-100';
      case 'missed': return 'text-brand-500 bg-red-100';
      default: return 'text-slate-400 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Assigned Tasks</p>
              <p className="text-3xl font-bold text-white">{stats.assignedTasks}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-brand-500" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">In Progress</p>
              <p className="text-3xl font-bold text-brand-500">{stats.inProgressTasks}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-brand-500" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Pending</p>
              <p className="text-3xl font-bold text-brand-500">{stats.pendingTasks}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-brand-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 glass-panel">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-medium text-white">Today's Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todaysTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{task.area}</h4>
                      <p className="text-sm text-slate-400">{task.route}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(task.scheduledTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </span>
                    {task.status === 'pending' && (
                      <button className="flex items-center px-3 py-1 btn-primary text-white text-xs rounded-lg hover:bg-emerald-700 transition-colors">
                        <Navigation className="h-3 w-3 mr-1" />
                        Start
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-medium text-white">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-3 btn-primary w-full">
              <Navigation className="h-5 w-5 mr-2" />
              Navigate to Next Stop
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 btn-primary w-full">
              <CheckCircle className="h-5 w-5 mr-2" />
              Mark as Complete
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 btn-primary w-full">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Report Issue
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Truck className="h-5 w-5 mr-2" />
              Vehicle Status
            </button>
          </div>

          {/* Vehicle Info */}
          <div className="px-6 pb-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Assigned Vehicle</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Plate:</span>
                  <span className="font-medium">WM-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacity:</span>
                  <span className="font-medium">10,000 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
