
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
    <div className="min-h-screen bg-motorcycle-dark">
      {/* Header */}
      <div className="bg-motorcycle-card shadow-professional-lg border-b-2 border-motorcycle-yellow card-professional">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Dashboard</h1>
              <p className="text-motorcycle-white/90 mt-2 text-lg">Welcome back! Here's what's happening with your events business.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="flex items-center gap-2 border-2 border-green-500 bg-green-500/20 text-green-400 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </Badge>
              <Button className="btn-primary shadow-lg hover:shadow-2xl transition-all duration-300">
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
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Bookings</CardTitle>
              <Calendar className="w-8 h-8 text-blue-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mockStats.totalBookings}</div>
              <p className="text-blue-200 text-sm mt-1">+{mockStats.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-2 border-green-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Revenue</CardTitle>
              <DollarSign className="w-8 h-8 text-green-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
              <p className="text-green-200 text-sm mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-2 border-purple-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Gallery Items</CardTitle>
              <Camera className="w-8 h-8 text-purple-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mockStats.galleryItems}</div>
              <p className="text-purple-200 text-sm mt-1">Photos & Videos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-2 border-orange-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Menu Items</CardTitle>
              <Utensils className="w-8 h-8 text-orange-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mockStats.menuItems}</div>
              <p className="text-orange-200 text-sm mt-1">Available dishes</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-2 border-indigo-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-100">Slider Images</CardTitle>
              <Camera className="w-8 h-8 text-indigo-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mockStats.sliderItems}</div>
              <p className="text-indigo-200 text-sm mt-1">Homepage slideshow</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-2 border-teal-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-teal-100">Active Users</CardTitle>
              <Users className="w-8 h-8 text-teal-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mockStats.activeUsers}</div>
              <p className="text-teal-200 text-sm mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-2 border-pink-400 card-professional group hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-pink-100">Growth Rate</CardTitle>
              <TrendingUp className="w-8 h-8 text-pink-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">+{mockStats.monthlyGrowth}%</div>
              <p className="text-pink-200 text-sm mt-1">Monthly growth</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="shadow-professional-lg card-professional border-2 border-motorcycle-yellow bg-motorcycle-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Recent Bookings</CardTitle>
                <Link href="/admin/bookings">
                  <Button variant="outline" size="sm" className="border-motorcycle-yellow text-motorcycle-white hover:bg-motorcycle-yellow hover:text-black">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-motorcycle-card rounded-lg hover:bg-motorcycle-card/80 transition-colors border border-motorcycle-yellow/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-motorcycle-yellow to-orange-500 rounded-full flex items-center justify-center text-black font-semibold">
                          {booking.client.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-motorcycle-white">{booking.client}</p>
                          <p className="text-sm text-motorcycle-white/70">{booking.event}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-motorcycle-white">${booking.amount}</p>
                          <p className="text-sm text-motorcycle-white/70">{booking.date}</p>
                        </div>
                        <Badge 
                          variant={booking.status === 'confirmed' ? 'default' : 
                                  booking.status === 'pending' ? 'secondary' : 'outline'}
                          className="capitalize border-motorcycle-yellow text-motorcycle-white"
                        >
                          {booking.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-motorcycle-white hover:bg-motorcycle-yellow hover:text-black">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-motorcycle-white hover:bg-motorcycle-yellow hover:text-black">
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
            <Card className="shadow-professional-lg card-professional border-2 border-motorcycle-yellow bg-motorcycle-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Button variant="outline" className="w-full justify-start h-12 hover:bg-motorcycle-yellow hover:text-black border-2 border-motorcycle-yellow text-motorcycle-white transition-all duration-300 group hover:scale-105 hover:shadow-lg">
                        <span className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{action.icon}</span>
                        <span className="ml-3 font-semibold">{action.title}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-professional-lg card-professional border-2 border-motorcycle-yellow bg-motorcycle-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-motorcycle-yellow rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-sm font-medium text-motorcycle-white">Conversion Rate</span>
                    </div>
                    <span className="text-lg font-bold text-motorcycle-yellow">+12.5%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-motorcycle-yellow rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                        <Users className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-sm font-medium text-motorcycle-white">Active Users</span>
                    </div>
                    <span className="text-lg font-bold text-motorcycle-yellow">{mockStats.activeUsers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-motorcycle-yellow rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                        <Clock className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-sm font-medium text-motorcycle-white">Avg. Response</span>
                    </div>
                    <span className="text-lg font-bold text-motorcycle-yellow">2.4h</span>
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
