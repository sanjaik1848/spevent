
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { placeholderImages } from "@/lib/placeholder-images";
import type { PageContent } from "@/lib/page-content";

type AboutContent = PageContent['about'];

export default function About({ content }: { content: AboutContent | undefined }) {
  const aboutImage = placeholderImages.find(p => p.id === "about-1");

  return (
    <section id="about" className="py-16 md:py-24 bg-motorcycle-dark">
      <div className="container-professional">
         <Card className="overflow-hidden shadow-2xl border-none card-professional border border-motorcycle-yellow group hover:scale-105 transition-all duration-700 rounded-3xl">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                   <CardHeader>
                        <CardTitle className="text-3xl font-motorcycle-heading text-white animate-fade-in">What Sets Us <span className="text-gradient">Apart</span></CardTitle>
                   </CardHeader>
                   <CardContent>
                        <p className="text-lg text-white mb-6 animate-fade-in leading-relaxed">
                            {content?.paragraph}
                        </p>
                        <blockquote className="border-l-4 border-motorcycle-yellow pl-4 italic text-white mb-8 bg-gradient-to-r from-motorcycle-yellow/10 to-transparent p-4 rounded-r-2xl animate-fade-in">
                            "{content?.quote}"
                        </blockquote>
                        <Button asChild className="btn-primary group hover:scale-105 hover:shadow-2xl transition-all duration-500">
                            <Link href="/about">Learn More About Us</Link>
                        </Button>
                   </CardContent>
                </div>
                <div className="relative w-full h-48 md:h-64 min-h-[200px] group">
                    {/* Animated border glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute inset-[2px] bg-motorcycle-dark"></div>
                    
                    {aboutImage && (
                        <Image 
                            src={aboutImage.imageUrl} 
                            alt={aboutImage.description}
                            fill
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                            data-ai-hint={aboutImage.imageHint}
                        />
                    )}
                    
                    {/* Floating elements on hover */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-300"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-500"></div>
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
}
