'use client';
import { Twitter, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { PageContent } from "@/lib/page-content";
import { useLogoData } from "@/hooks/useLogoData";

type FooterContent = PageContent['footer'];

export default function Footer({ content }: { content: FooterContent | undefined }) {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { logoData } = useLogoData();

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
        "w-full bg-secondary text-secondary-foreground shadow-t-lg transition-all duration-700 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left py-12">
        <div>
                 <div className="flex items-center justify-center md:justify-start mb-4">
                   {logoData.footerLogo.url ? (
                     <Image
                       src={logoData.footerLogo.url}
                       alt={logoData.footerLogo.alt}
                       width={logoData.footerLogo.width}
                       height={logoData.footerLogo.height}
                       className="object-contain"
                     />
                   ) : (
                     <h3 className="font-bold text-lg font-serif text-gradient">Elite Events</h3>
                   )}
                 </div>
                 <p className="text-muted-foreground">Crafting unforgettable experiences with elegance and precision.</p>
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-4 font-serif">Quick Links</h3>
                 <ul className="space-y-2 text-muted-foreground">
                   <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                   <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                   <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                   <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                 </ul>
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-4 font-serif">Connect With Us</h3>
                 <ul className="space-y-2 text-muted-foreground">
                   <li className="flex items-center justify-center md:justify-start">
                     <span className="font-semibold mr-2">Phone:</span>
                     <span>+1-234-567-8900</span>
                   </li>
                   <li className="flex items-center justify-center md:justify-start">
                     <span className="font-semibold mr-2">Email:</span>
                     <span>info@eliteevents.com</span>
                   </li>
                   <li className="flex items-center justify-center md:justify-start">
                     <span className="font-semibold mr-2">Address:</span>
                     <span>Elite Events Center, Downtown District</span>
                   </li>
                 </ul>
                 <div className="mt-4">
                   <div className="flex justify-center md:justify-start space-x-4">
                     <Link href="#" className="hover:text-primary transition-colors"><Twitter /></Link>
                     <Link href="#" className="hover:text-primary transition-colors"><Instagram /></Link>
                     <Link href="#" className="hover:text-primary transition-colors"><Facebook /></Link>
                   </div>
                 </div>
               </div>
      </div>
      
      
      <div className="container mx-auto text-center border-t border-border pt-6 pb-6">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Elite Events. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
