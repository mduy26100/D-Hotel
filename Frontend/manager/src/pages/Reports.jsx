import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react"

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">View analytics and generate reports</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">$45,678</p>
          <p className="text-sm text-green-600">+15.3% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Average Booking Value</h3>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">$385</p>
          <p className="text-sm text-blue-600">+8.2% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Occupancy Rate</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">78%</p>
          <p className="text-sm text-purple-600">+5.1% from last month</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Top Performing Rooms */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Top Performing Rooms</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { room: "Suite 310", revenue: "$12,450", bookings: 28 },
              { room: "Presidential 412", revenue: "$11,200", bookings: 14 },
              { room: "Deluxe 205", revenue: "$9,800", bookings: 35 },
              { room: "Standard 101", revenue: "$8,500", bookings: 52 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.room}</p>
                  <p className="text-sm text-gray-600">{item.bookings} bookings</p>
                </div>
                <p className="text-lg font-bold text-primary">{item.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
