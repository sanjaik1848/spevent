import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Camera,
  Download,
  Filter
} from "lucide-react";

// Mock analytics data
const analyticsData = {
  totalRevenue: 45680,
  monthlyGrowth: 15.2,
  totalBookings: 89,
  bookingsGrowth: 8.5,
  totalViews: 12450,
  viewsGrowth: 22.1,
  conversionRate: 12.8,
  conversionGrowth: -2.1
};

const monthlyData = [
  { month: "Jan", bookings: 12, revenue: 8500, views: 1200 },
  { month: "Feb", bookings: 15, revenue: 10200, views: 1450 },
  { month: "Mar", bookings: 18, revenue: 12800, views: 1680 },
  { month: "Apr", bookings: 22, revenue: 15600, views: 1920 },
  { month: "May", bookings: 25, revenue: 18200, views: 2100 },
  { month: "Jun", bookings: 28, revenue: 20400, views: 2350 },
  { month: "Jul", bookings: 32, revenue: 22800, views: 2680 },
  { month: "Aug", bookings: 35, revenue: 25200, views: 2890 },
  { month: "Sep", bookings: 38, revenue: 27600, views: 3120 },
  { month: "Oct", bookings: 42, revenue: 30400, views: 3450 },
  { month: "Nov", bookings: 45, revenue: 32800, views: 3680 },
  { month: "Dec", bookings: 48, revenue: 35200, views: 3920 }
];

const topEvents = [
  { event: "Weddings", bookings: 24, revenue: 18000, percentage: 45 },
  { event: "Corporate Events", bookings: 18, revenue: 14400, percentage: 35 },
  { event: "Birthday Parties", bookings: 15, revenue: 9000, percentage: 20 }
];

const recentActivity = [
  { action: "New booking received", client: "Sarah Johnson", time: "2 hours ago", type: "booking" },
  { action: "Gallery uploaded", client: "Mike Chen", time: "4 hours ago", type: "gallery" },
  { action: "Payment received", client: "Emily Davis", time: "6 hours ago", type: "payment" },
  { action: "Event completed", client: "David Wilson", time: "1 day ago", type: "event" },
  { action: "New inquiry", client: "Lisa Brown", time: "2 days ago", type: "inquiry" }
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your studio's performance and growth metrics.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-200 mr-1" />
                    <span className="text-green-200 text-sm">+{analyticsData.monthlyGrowth}%</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold">{analyticsData.totalBookings}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-blue-200 mr-1" />
                    <span className="text-blue-200 text-sm">+{analyticsData.bookingsGrowth}%</span>
                  </div>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Gallery Views</p>
                  <p className="text-3xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-purple-200 mr-1" />
                    <span className="text-purple-200 text-sm">+{analyticsData.viewsGrowth}%</span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Conversion Rate</p>
                  <p className="text-3xl font-bold">{analyticsData.conversionRate}%</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 text-orange-200 mr-1" />
                    <span className="text-orange-200 text-sm">{analyticsData.conversionGrowth}%</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.slice(-6).map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {data.month}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{data.bookings} Bookings</p>
                          <p className="text-sm text-gray-500">{data.views} Gallery Views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${data.revenue.toLocaleString()}</p>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                            style={{ width: `${(data.revenue / 40000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Events & Recent Activity */}
          <div className="space-y-6">
            {/* Top Events */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Top Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEvents.map((event, index) => (
                    <div key={event.event} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{event.event}</span>
                        <span className="text-sm text-gray-500">{event.bookings} bookings</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{ width: `${event.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>${event.revenue.toLocaleString()}</span>
                        <span>{event.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        {activity.type === 'booking' && <Calendar className="w-4 h-4 text-white" />}
                        {activity.type === 'gallery' && <Camera className="w-4 h-4 text-white" />}
                        {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-white" />}
                        {activity.type === 'event' && <Calendar className="w-4 h-4 text-white" />}
                        {activity.type === 'inquiry' && <Users className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.client}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
