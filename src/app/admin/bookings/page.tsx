import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from "lucide-react";

// Mock bookings data
const bookings = [
  {
    id: 1,
    client: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    event: "Wedding",
    date: "2024-01-15",
    time: "14:00",
    duration: "8 hours",
    status: "confirmed",
    amount: 2500,
    deposit: 500,
    location: "Grand Ballroom, Downtown",
    notes: "Outdoor ceremony, indoor reception"
  },
  {
    id: 2,
    client: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 234-5678",
    event: "Corporate Event",
    date: "2024-01-18",
    time: "18:00",
    duration: "4 hours",
    status: "pending",
    amount: 1800,
    deposit: 0,
    location: "Conference Center",
    notes: "Product launch event"
  },
  {
    id: 3,
    client: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    event: "Birthday Party",
    date: "2024-01-20",
    time: "19:00",
    duration: "6 hours",
    status: "confirmed",
    amount: 1200,
    deposit: 300,
    location: "Private Residence",
    notes: "50th birthday celebration"
  },
  {
    id: 4,
    client: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    event: "Anniversary",
    date: "2024-01-22",
    time: "16:00",
    duration: "4 hours",
    status: "completed",
    amount: 950,
    deposit: 200,
    location: "Garden Venue",
    notes: "25th anniversary"
  },
  {
    id: 5,
    client: "Lisa Brown",
    email: "lisa.brown@email.com",
    phone: "+1 (555) 567-8901",
    event: "Graduation Party",
    date: "2024-01-25",
    time: "17:00",
    duration: "5 hours",
    status: "pending",
    amount: 1100,
    deposit: 0,
    location: "Community Center",
    notes: "High school graduation"
  }
];

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusIcons = {
  confirmed: CheckCircle,
  pending: Clock,
  completed: CheckCircle,
  cancelled: XCircle
};

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
              <p className="text-gray-600 mt-1">Manage all your photography bookings and events.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Search bookings..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold">{bookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Confirmed</p>
                  <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Pending</p>
                  <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Revenue</p>
                  <p className="text-3xl font-bold">${bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Event</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const StatusIcon = statusIcons[booking.status as keyof typeof statusIcons];
                    return (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{booking.client}</p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{booking.event}</p>
                            <p className="text-sm text-gray-500">{booking.location}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{booking.date}</p>
                            <p className="text-sm text-gray-500">{booking.time} ({booking.duration})</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${statusColors[booking.status as keyof typeof statusColors]} flex items-center gap-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">${booking.amount}</p>
                            {booking.deposit > 0 && (
                              <p className="text-sm text-gray-500">Deposit: ${booking.deposit}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}