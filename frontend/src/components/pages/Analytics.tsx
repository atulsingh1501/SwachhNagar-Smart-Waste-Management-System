import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Clock,
  MapPin,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext_backend';
import { fetchCollections, fetchReports, fetchVehicles, fetchRoutes } from '../../lib/api_fixed';

export default function Analytics() {
  const { token: contextToken } = useAuth();
  const [dateRange, setDateRange] = useState('7d');
  const [reportType, setReportType] = useState('overview');
  const [collections, setCollections] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    console.log('Analytics: Starting data load...');
    try {
      setLoading(true);
      setError(null);
      const token = contextToken || localStorage.getItem('auth_token') || localStorage.getItem('token');
      if (!token) {
        setError('User token not found. Please login again.');
        setLoading(false);
        return;
      }

      const [collectionsData, reportsData, vehiclesData, routesData] = await Promise.all([
        fetchCollections(token).catch(e => {
          console.error('Error fetching collections:', e);
          throw new Error('Failed to fetch collections');
        }),
        fetchReports(token).catch(e => {
          console.error('Error fetching reports:', e);
          throw new Error('Failed to fetch reports');
        }),
        fetchVehicles(token).catch(e => {
          console.error('Error fetching vehicles:', e);
          throw new Error('Failed to fetch vehicles');
        }),
        fetchRoutes(token).catch(e => {
          console.error('Error fetching routes:', e);
          throw new Error('Failed to fetch routes');
        })
      ]);

      setCollections(collectionsData);
      setReports(reportsData);
      setVehicles(vehiclesData);
      setRoutes(routesData);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Analytics loadData error:', errMsg);
      setError(`Failed to load data. Reason: ${errMsg}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Analytics</h3>
        <p className="text-red-700 text-center mb-6">{error}</p>
        <button
          onClick={loadData}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  try {
    const analytics = {
      totalCollections: collections?.length || 0,
      completedCollections: collections?.filter((c: any) => c.status === 'completed').length || 0,
      pendingCollections: collections?.filter((c: any) => c.status === 'pending').length || 0,
      totalReports: reports?.length || 0,
      resolvedReports: reports?.filter((r: any) => r.status === 'resolved').length || 0,
      activeVehicles: vehicles?.filter((v: any) => v.status === 'active').length || 0,
      activeRoutes: routes?.filter((r: any) => r.status === 'active').length || 0,
    };

    const completionRate = analytics.totalCollections > 0
      ? Math.round((analytics.completedCollections / analytics.totalCollections) * 100)
      : 0;

    const resolutionRate = analytics.totalReports > 0
      ? Math.round((analytics.resolvedReports / analytics.totalReports) * 100)
      : 0;

    const chartData = {
      collections: [
        { day: 'Mon', completed: 45, pending: 12 },
        { day: 'Tue', completed: 52, pending: 8 },
        { day: 'Wed', completed: 48, pending: 15 },
        { day: 'Thu', completed: 61, pending: 6 },
        { day: 'Fri', completed: 55, pending: 10 },
        { day: 'Sat', completed: 38, pending: 18 },
        { day: 'Sun', completed: 42, pending: 14 }
      ],
      reports: [
        { day: 'Mon', received: 8, resolved: 12 },
        { day: 'Tue', received: 12, resolved: 10 },
        { day: 'Wed', received: 6, resolved: 15 },
        { day: 'Thu', received: 15, resolved: 8 },
        { day: 'Fri', received: 9, resolved: 18 },
        { day: 'Sat', received: 18, resolved: 6 },
        { day: 'Sun', received: 11, resolved: 14 }
      ]
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            <p className="text-gray-600">Comprehensive insights into waste management operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{completionRate}%</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs sm:text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+5.2% from last week</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Report Resolution</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{resolutionRate}%</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs sm:text-sm">
              <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-blue-600">+2.1% from last week</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">2.4h</p>
              </div>
              <div className="bg-orange-100 p-2 sm:p-3 rounded-full">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs sm:text-sm">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">-0.3h from last week</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Fleet Utilization</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">87%</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs sm:text-sm">
              <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-purple-600">+3.5% from last week</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Daily Collections</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.collections.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="w-full flex flex-col items-center space-y-1">
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(data.completed / 70) * 200}px` }}
                      ></div>
                      <div 
                        className="w-full bg-orange-300 rounded-b"
                        style={{ height: `${(data.pending / 70) * 200}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-300 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Citizen Reports</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.reports.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="w-full flex flex-col items-center space-y-1">
                      <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(data.resolved / 20) * 200}px` }}></div>
                      <div className="w-full bg-red-300 rounded-b" style={{ height: `${(data.received / 20) * 200}px` }}></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Resolved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-300 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Received</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">Performance Summary</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{analytics.activeRoutes}</div>
                <div className="text-sm text-gray-600 mb-4">Active Routes</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${(analytics.activeRoutes / (routes?.length || 1)) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{analytics.activeVehicles}</div>
                <div className="text-sm text-gray-600 mb-4">Active Vehicles</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(analytics.activeVehicles / (vehicles?.length || 1)) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round(((analytics.completedCollections + analytics.resolvedReports) / (analytics.totalCollections + analytics.totalReports || 1)) * 100)}%</div>
                <div className="text-sm text-gray-600 mb-4">Overall Efficiency</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${((analytics.completedCollections + analytics.resolvedReports) / (analytics.totalCollections + analytics.totalReports || 1)) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">System Insights</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Top Performing Areas</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium">Downtown</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">98% completion</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Suburbs</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">94% completion</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-sm font-medium">Industrial</span>
                    </div>
                    <span className="text-sm text-orange-600 font-medium">87% completion</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Resource Utilization</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium">Vehicle Fleet</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">87% utilized</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium">Staff Deployment</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">92% deployed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium">Route Efficiency</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">89% optimal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (renderError) {
    console.error('Analytics render error:', renderError);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">An error occurred while rendering the analytics page. Please try again later.</p>
      </div>
    );
  }
}
