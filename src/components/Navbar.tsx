
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Food", href: "/food" },
    { name: "Organic Food", href: "/organic-food" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  
  const linkTextColor = "text-gray-300 hover:text-white";

  return (
    <header className="relative w-full z-40 bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-white">
             <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                S
            </div>
            <span>SP Events</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={cn(
                "text-sm font-medium transition-colors", 
                pathname === link.href ? "text-primary" : linkTextColor
              )}>
                {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
            <Button asChild>
                <Link href="/booking">Book Event</Link>
            </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-800 text-white border-r-gray-700">
                <div className="flex flex-col items-center py-4 space-y-4">
                    <Link href="/" className="text-2xl font-serif text-primary mb-4" onClick={() => setOpen(false)}>SP Events</Link>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className={cn("text-lg transition-colors", pathname === link.href ? "text-primary" : "hover:text-primary")}>
                            {link.name}
                        </Link>
                    ))}
                    <Button asChild onClick={() => setOpen(false)}>
                        <Link href="/booking">Book Event</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
