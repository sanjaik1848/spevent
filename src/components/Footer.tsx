'use client';
import { Twitter, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { PageContent } from "@/lib/page-content";
import { useLogoData } from "@/hooks/useLogoData";

type FooterContent = PageContent['footer'];

export default function Footer({ content }: { content: FooterContent | undefined }) {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { logoData } = useLogoData();
  const pathname = usePathname();
  const isOrganicPage = pathname === '/organic-food';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className={cn(
        "w-full shadow-t-lg transition-all duration-700 ease-in-out relative",
        isOrganicPage ? "bg-transparent text-white" : "bg-secondary text-secondary-foreground",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <div className={cn(
        "container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left py-8 sm:py-12 px-4 sm:px-6",
        isOrganicPage ? "relative z-10" : ""
      )}>
        <div className="sm:col-span-2 lg:col-span-1">
                 <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
                   {logoData.footerLogo.url ? (
                     <Image
                       src={logoData.footerLogo.url}
                       alt={logoData.footerLogo.alt}
                       width={logoData.footerLogo.width}
                       height={logoData.footerLogo.height}
                       className="object-contain w-16 h-16 sm:w-20 sm:h-20"
                     />
                   ) : (
                     <h3 className="font-bold text-base sm:text-lg font-serif text-gradient">SP Events</h3>
                   )}
                 </div>
                 <p className={cn("text-sm sm:text-base", isOrganicPage ? "text-white/90" : "text-muted-foreground")}>Crafting unforgettable experiences with elegance and precision.</p>
               </div>
               <div>
                 <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 font-serif">Quick Links</h3>
                 <ul className={cn("space-y-1 sm:space-y-2 text-sm sm:text-base", isOrganicPage ? "text-white/80" : "text-muted-foreground")}>
                   <li><Link href="/about" className={cn("transition-colors", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}>About Us</Link></li>
                   <li><Link href="/services" className={cn("transition-colors", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}>Services</Link></li>
                   <li><Link href="/gallery" className={cn("transition-colors", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}>Gallery</Link></li>
                   <li><Link href="/contact" className={cn("transition-colors", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}>Contact</Link></li>
                 </ul>
               </div>
               <div>
                 <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 font-serif">Connect With Us</h3>
                 <ul className={cn("space-y-1 sm:space-y-2 text-sm sm:text-base", isOrganicPage ? "text-white/80" : "text-muted-foreground")}>
                   <li className="flex items-center justify-center md:justify-start">
                     <span className="font-semibold mr-2">Phone:</span>
                     <span className="break-all">+1-234-567-8900</span>
                   </li>
                   <li className="flex items-center justify-center md:justify-start">
                     <span className="font-semibold mr-2">Email:</span>
                     <span className="break-all">info@spevents.com</span>
                   </li>
                   <li className="flex items-center justify-center md:justify-start">
                     <span className="font-semibold mr-2">Address:</span>
                     <span className="break-words">SP Events Center, Downtown District</span>
                   </li>
                 </ul>
                 <div className="mt-3 sm:mt-4">
                   <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
                     <Link href="#" className={cn("transition-colors w-5 h-5 sm:w-6 sm:h-6", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}><Twitter className="w-full h-full" /></Link>
                     <Link href="#" className={cn("transition-colors w-5 h-5 sm:w-6 sm:h-6", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}><Instagram className="w-full h-full" /></Link>
                     <Link href="#" className={cn("transition-colors w-5 h-5 sm:w-6 sm:h-6", isOrganicPage ? "hover:text-green-300" : "hover:text-primary")}><Facebook className="w-full h-full" /></Link>
                   </div>
                 </div>
               </div>
      </div>
      
      
      <div className={cn("container mx-auto text-center pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 sm:px-6", isOrganicPage ? "border-t border-white/20" : "border-t border-border")}>
        <p className={cn("text-xs sm:text-sm", isOrganicPage ? "text-white/80" : "text-muted-foreground")}>&copy; {new Date().getFullYear()} SP Events. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
