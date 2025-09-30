
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { useLogoData } from "@/hooks/useLogoData";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { logoData } = useLogoData();

  // Check if we're on the home page (website page)
  const isHomePage = pathname === '/website';

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Food", href: "/food" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Book Event", href: "/booking" },
  ];
  
  return (
    <header className={`w-full z-40 bg-gray-800 text-white py-4 ${isHomePage ? 'relative' : 'sticky top-0'}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-white">
          {logoData.headerLogo.url ? (
            <Image
              src={logoData.headerLogo.url}
              alt={logoData.headerLogo.alt}
              width={logoData.headerLogo.width}
              height={logoData.headerLogo.height}
              className="object-contain"
            />
                 ) : (
                   <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      E
                   </div>
                 )}
                 <span className="text-gradient">Elite Events</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={cn(
                "text-sm font-medium transition-colors hover:text-blue-400", 
                pathname === link.href ? "text-blue-400" : "text-white"
              )}>
                {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
            <Button asChild className="btn-primary">
                <Link href="/booking">Book Event</Link>
            </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-gray-700 text-white">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-800 text-white border-r-gray-700">
                <div className="flex flex-col items-center py-4 space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-serif text-gradient mb-4" onClick={() => setOpen(false)}>
                      {logoData.headerLogo.url ? (
                        <Image
                          src={logoData.headerLogo.url}
                          alt={logoData.headerLogo.alt}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            E
                          </div>
                        )}
                        Elite Events
                    </Link>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className={cn("text-lg transition-colors hover:text-blue-400", pathname === link.href ? "text-blue-400" : "text-white")}>
                            {link.name}
                        </Link>
                    ))}
                    <Button asChild onClick={() => setOpen(false)} className="btn-primary">
                        <Link href="/booking">Book Event</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
