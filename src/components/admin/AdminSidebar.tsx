"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  Calendar, 
  Camera, 
  Utensils, 
  Users, 
  Settings, 
  BarChart3,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  ImageIcon,
  Home as HomeIcon,
  Edit,
  MessageSquare,
  TrendingUp
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Welcome Page", href: "/admin/welcome", icon: HomeIcon },
  { name: "Website Content", href: "/admin/content", icon: Edit },
  { name: "Client Statistics", href: "/admin/stats", icon: TrendingUp },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar, badge: "8" },
  { name: "Gallery", href: "/admin/gallery", icon: Camera },
  { name: "Food Management", href: "/admin/food", icon: Utensils },
  { name: "Menu", href: "/admin/menu", icon: Utensils },
  { name: "Slider", href: "/admin/slider", icon: ImageIcon },
  { name: "Logos", href: "/admin/logos", icon: ImageIcon },
  { name: "WhatsApp Chat", href: "/admin/whatsapp", icon: MessageSquare },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
         { name: "Staff Management", href: "/admin/users", icon: Users },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    
    // Call logout function
    logout();
    
    // Redirect to login
    router.push('/login');
  };

  return (
    <div className="h-full w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Event Admin</h1>
              <p className="text-xs text-gray-500">Event Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                onClick={() => {
                  onClose?.();
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "default"} 
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          {/* Notifications */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs text-gray-500">3 new alerts</p>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">3</Badge>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@eliteevents.com'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Home className="w-4 h-4 mr-2" />
                View Website
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
    </div>
  );
}
