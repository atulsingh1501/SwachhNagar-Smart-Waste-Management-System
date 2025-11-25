import { useState } from 'react';
import { useAuth } from '../../context/AuthContext_fixed';
import { 
  LogOut, 
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar & Hamburger */}
      <header className="md:hidden bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center">
          <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" />
          <span className="ml-2 text-base sm:text-lg font-bold text-gray-900">WasteMS - Vadodara</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 sm:p-2 text-gray-600 focus:outline-none">
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-200 hidden md:flex items-center">
            <Truck className="h-8 w-8 text-emerald-600" />
            <span className="ml-3 text-xl font-bold text-gray-900">WasteMS - Vadodara</span>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-medium">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
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
                  onClick={() => { onPageChange(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-2">
            <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
            <button
              onClick={signOut}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
