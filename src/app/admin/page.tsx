
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Camera, 
  Utensils, 
  Users, 
  TrendingUp, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import { mediaData } from "@/lib/media";
import { menuData } from "@/lib/menu-data";
import { slideshowImages } from "@/lib/slideshow-images";

// Calculate real stats from website data
const totalGalleryItems = placeholderImages.length + Object.values(mediaData).reduce((sum, category) => sum + category.items.length, 0);
const totalMenuItems = menuData.starters.length + menuData.mainCourses.length + menuData.desserts.length + menuData.veg.length;

const mockStats = {
  totalBookings: 24,
  pendingBookings: 8,
  completedBookings: 16,
  totalRevenue: 15680,
  galleryItems: totalGalleryItems,
  menuItems: totalMenuItems,
  sliderItems: slideshowImages.length,
  activeUsers: 128,
  monthlyGrowth: 12.5
};

const recentBookings = [
  { id: 1, client: "Sarah Johnson", event: "Wedding", date: "2024-01-15", status: "confirmed", amount: 2500 },
  { id: 2, client: "Mike Chen", event: "Corporate Event", date: "2024-01-18", status: "pending", amount: 1800 },
  { id: 3, client: "Emily Davis", event: "Birthday Party", date: "2024-01-20", status: "confirmed", amount: 1200 },
  { id: 4, client: "David Wilson", event: "Anniversary", date: "2024-01-22", status: "completed", amount: 950 },
];

const quickActions = [
  { title: "Manage Bookings", icon: <Calendar className="w-5 h-5" />, href: "/admin/bookings" },
  { title: "Manage Gallery", icon: <Camera className="w-5 h-5" />, href: "/admin/gallery" },
  { title: "Food Management", icon: <Utensils className="w-5 h-5" />, href: "/admin/food" },
  { title: "Manage Menu", icon: <Utensils className="w-5 h-5" />, href: "/admin/menu" },
  { title: "Manage Slider", icon: <Camera className="w-5 h-5" />, href: "/admin/slider" },
  { title: "View Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/admin/analytics" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your studio.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Live
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Bookings</CardTitle>
              <Calendar className="w-8 h-8 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.totalBookings}</div>
              <p className="text-blue-200 text-sm mt-1">+{mockStats.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Revenue</CardTitle>
              <DollarSign className="w-8 h-8 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
              <p className="text-green-200 text-sm mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Gallery Items</CardTitle>
              <Camera className="w-8 h-8 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.galleryItems}</div>
              <p className="text-purple-200 text-sm mt-1">Photos & Videos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Menu Items</CardTitle>
              <Utensils className="w-8 h-8 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.menuItems}</div>
              <p className="text-orange-200 text-sm mt-1">Available dishes</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-100">Slider Images</CardTitle>
              <Camera className="w-8 h-8 text-indigo-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.sliderItems}</div>
              <p className="text-indigo-200 text-sm mt-1">Homepage slideshow</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-teal-100">Active Users</CardTitle>
              <Users className="w-8 h-8 text-teal-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.activeUsers}</div>
              <p className="text-teal-200 text-sm mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-pink-100">Growth Rate</CardTitle>
              <TrendingUp className="w-8 h-8 text-pink-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+{mockStats.monthlyGrowth}%</div>
              <p className="text-pink-200 text-sm mt-1">Monthly growth</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
                <Link href="/admin/bookings">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {booking.client.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.client}</p>
                          <p className="text-sm text-gray-600">{booking.event}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${booking.amount}</p>
                          <p className="text-sm text-gray-600">{booking.date}</p>
                        </div>
                        <Badge 
                          variant={booking.status === 'confirmed' ? 'default' : 
                                  booking.status === 'pending' ? 'secondary' : 'outline'}
                          className="capitalize"
                        >
                          {booking.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                        {action.icon}
                        <span className="ml-3">{action.title}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Conversion Rate</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">+12.5%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">Active Users</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{mockStats.activeUsers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">Avg. Response</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">2.4h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
