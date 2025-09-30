
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Images, Utensils, SlidersHorizontal, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Gallery", href: "/admin/gallery", icon: Images },
  { name: "Menu", href: "/admin/menu", icon: Utensils },
  { name: "Slider", href: "/admin/slider", icon: SlidersHorizontal },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-center border-b border-gray-700">
        <Link href="/admin">
          <h2 className="text-2xl font-bold font-serif">SP Events</h2>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-700">
         <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
           <LogOut className="w-5 h-5" />
           <span>Back to Site</span>
         </Link>
      </div>
    </aside>
  );
}
