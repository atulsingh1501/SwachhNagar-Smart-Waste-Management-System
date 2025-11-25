import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LogOut, 
  Bell, 
  Settings, 
  Truck, 
  Map, 
  BarChart3, 
  Users, 
  AlertTriangle,
  Home,
  Route,
  FileText
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const { user, signOut } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { id: 'users', label: 'Users', icon: Users },
          { id: 'routes', label: 'Routes', icon: Route },
          { id: 'vehicles', label: 'Vehicles', icon: Truck },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ];
      case 'manager':
        return [
          ...baseItems,
          { id: 'routes', label: 'Routes', icon: Route },
          { id: 'vehicles', label: 'Vehicles', icon: Truck },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ];
      case 'staff':
        return [
          ...baseItems,
          { id: 'tasks', label: 'My Tasks', icon: Map },
          { id: 'reports', label: 'Reports', icon: FileText },
        ];
      case 'citizen':
        return [
          ...baseItems,
          { id: 'report', label: 'Report Issue', icon: AlertTriangle },
          { id: 'my-reports', label: 'My Reports', icon: FileText },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen text-slate-300">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#0d0d0f]/80 backdrop-blur-xl border-r border-white/10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-white/10">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-brand-500" />
              <span className="ml-3 text-xl font-bold text-white">WasteMS</span>
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                <span className="text-brand-500 font-medium">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-brand-500/20 text-brand-500'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-4 border-t border-white/10 space-y-2">
            <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-white/10">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
            <button
              onClick={signOut}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-500/20"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-[#0d0d0f]/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-white capitalize">
              {currentPage === 'my-reports' ? 'My Reports' : currentPage}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-500 hover:text-slate-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
