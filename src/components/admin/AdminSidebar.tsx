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
  TrendingUp,
  Leaf,
  Film,
  Image,
  FileImage,
  Folder,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const navigationSections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Content Management",
    items: [
      { name: "Welcome Page", href: "/admin/welcome", icon: HomeIcon },
      { name: "Website Content", href: "/admin/content", icon: Edit },
      { name: "About Page", href: "/admin/about", icon: Users },
      { name: "Organic Food", href: "/admin/organic-food", icon: Leaf },
      { name: "Client Statistics", href: "/admin/stats", icon: TrendingUp },
    ]
  },
  {
    title: "Media Management",
    items: [
      { name: "Gallery", href: "/admin/gallery", icon: Camera },
      { name: "Slider Images", href: "/admin/slider", icon: ImageIcon },
      { name: "Logos", href: "/admin/logos", icon: FileImage },
      { name: "Food Images", href: "/admin/food", icon: Utensils },
    ]
  },
  {
    title: "Operations",
    items: [
      { name: "Bookings", href: "/admin/bookings", icon: Calendar, badge: "8" },
      { name: "Menu", href: "/admin/menu", icon: Utensils },
      { name: "WhatsApp Chat", href: "/admin/whatsapp", icon: MessageSquare },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Staff Management", href: "/admin/users", icon: Users },
      { name: "Reports", href: "/admin/reports", icon: FileText },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
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
    <div className="h-full w-64 bg-motorcycle-card shadow-professional-lg border-r-2 border-motorcycle-yellow flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b-2 border-motorcycle-yellow bg-motorcycle-dark">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-motorcycle-yellow to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Camera className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-motorcycle-white">SP Events</h1>
              <p className="text-xs text-motorcycle-yellow">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-motorcycle-yellow uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group
                        ${isActive 
                          ? 'bg-gradient-to-r from-motorcycle-yellow to-orange-500 text-black shadow-lg scale-105' 
                          : 'text-motorcycle-white hover:bg-motorcycle-dark hover:text-motorcycle-yellow hover:scale-105'
                        }
                      `}
                      onClick={() => {
                        onClose?.();
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-black' : 'text-motorcycle-yellow'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          className={`text-xs ${isActive ? 'bg-black text-motorcycle-yellow' : 'bg-motorcycle-yellow text-black'}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t-2 border-motorcycle-yellow bg-motorcycle-dark">
          {/* Notifications */}
          <div className="flex items-center justify-between p-3 bg-motorcycle-card rounded-xl mb-4 border border-motorcycle-yellow/30 hover:border-motorcycle-yellow transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-motorcycle-yellow rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-motorcycle-white">Notifications</p>
                <p className="text-xs text-motorcycle-yellow">3 new alerts</p>
              </div>
            </div>
            <Badge className="text-xs bg-red-500 text-white">3</Badge>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3 p-3 bg-motorcycle-card rounded-xl mb-4 border border-motorcycle-yellow/30">
            <div className="w-10 h-10 bg-gradient-to-br from-motorcycle-yellow to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-motorcycle-white">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-motorcycle-yellow">{user?.email || 'admin@spevents.com'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Link href="/" className="block">
              <Button className="w-full justify-start bg-motorcycle-card border-2 border-motorcycle-yellow text-motorcycle-white hover:bg-motorcycle-yellow hover:text-black transition-all duration-300">
                <Home className="w-4 h-4 mr-2" />
                View Website
              </Button>
            </Link>
            <Button 
              className="w-full justify-start bg-red-500/20 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
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
