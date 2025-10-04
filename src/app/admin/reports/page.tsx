"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  DollarSign, 
  Users, 
  Star,
  FileText,
  PieChart,
  Activity
} from "lucide-react";

export default function ReportsPage() {
  const mockReports = {
    revenue: {
      total: 45680,
      monthly: 12850,
      growth: 15.2
    },
    bookings: {
      total: 156,
      thisMonth: 24,
      completed: 142,
      pending: 14
    },
    customers: {
      total: 89,
      new: 12,
      returning: 77,
      satisfaction: 4.8
    }
  };

  const recentReports = [
    { id: 1, title: "Monthly Revenue Report", date: "2024-01-15", type: "Revenue", status: "Generated" },
    { id: 2, title: "Customer Satisfaction Analysis", date: "2024-01-10", type: "Analytics", status: "Generated" },
    { id: 3, title: "Booking Trends Report", date: "2024-01-05", type: "Bookings", status: "Pending" },
    { id: 4, title: "Menu Performance Report", date: "2024-01-01", type: "Menu", status: "Generated" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and view comprehensive business reports</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export All Reports
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockReports.revenue.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{mockReports.revenue.growth}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReports.bookings.total}</div>
              <p className="text-xs text-muted-foreground">
                {mockReports.bookings.completed} completed, {mockReports.bookings.pending} pending
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReports.customers.satisfaction}/5</div>
              <p className="text-xs text-muted-foreground">
                Based on {mockReports.customers.total} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue Reports</TabsTrigger>
            <TabsTrigger value="bookings">Booking Reports</TabsTrigger>
            <TabsTrigger value="customers">Customer Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Revenue Reports */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Revenue breakdown by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">January 2024</span>
                      <span className="font-bold">${mockReports.revenue.monthly.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">December 2023</span>
                      <span className="font-bold">${(mockReports.revenue.monthly * 0.85).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">November 2023</span>
                      <span className="font-bold">${(mockReports.revenue.monthly * 0.92).toLocaleString()}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Event Type</CardTitle>
                  <CardDescription>Revenue breakdown by event category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weddings</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Corporate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Parties</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full w-1/3"></div>
                        </div>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Booking Reports */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>Booking statistics and trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{mockReports.bookings.total}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{mockReports.bookings.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">{mockReports.bookings.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Booking Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Reports */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Customer satisfaction and feedback analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Customer Satisfaction</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>5 Stars</span>
                        <span>68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>4 Stars</span>
                        <span>22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3 Stars</span>
                        <span>8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2 Stars</span>
                        <span>2%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Customer Types</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>New Customers</span>
                        <span>{mockReports.customers.new}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Returning Customers</span>
                        <span>{mockReports.customers.returning}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Customers</span>
                        <span>{mockReports.customers.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Booking Value</span>
                      <span className="font-bold">$1,240</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Booking Conversion Rate</span>
                      <span className="font-bold">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Customer Retention Rate</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Event Success Rate</span>
                      <span className="font-bold">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Latest generated reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{report.title}</p>
                          <p className="text-xs text-gray-600">{report.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{report.type}</Badge>
                          <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
