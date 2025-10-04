
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { heroImages as defaultHeroImages, type HeroImage } from "@/lib/hero-images";

export default function Hero({ content }: { content: { title: string; subtitle: string } | undefined }) {
  const [heroImages, setHeroImages] = useState<HeroImage[]>(defaultHeroImages);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    if (heroImages.length === 0) return;
    setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevSlide = () => {
    if (heroImages.length === 0) return;
    setIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };
  
  if (loading) {
    return <Skeleton className="relative h-screen w-full" />
  }

  if (heroImages.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden text-white bg-gray-800 flex items-center justify-center">
         <div className="text-center">
            <h1 className="text-4xl font-bold">No slides found</h1>
            <p className="text-muted-foreground mt-2">Please add slides.</p>
          </div>
      </section>
    );
  }

  const currentImage = heroImages[index];

  return (
    <section className="relative h-screen overflow-hidden text-white bg-motorcycle-dark">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-80"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-2xl animate-bounce delay-3000"></div>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05, rotate: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.05, rotate: -0.5 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.description}
            fill
            className="object-cover object-center"
            priority
            data-ai-hint={currentImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

           <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-3 sm:px-4 lg:px-8">
             <motion.h1 
               key={index + '-h1'}
               initial={{ opacity: 0, y: 30, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-motorcycle-heading font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg leading-tight animate-pulse"
             >
               {content?.title ?? 'SP Events'}
             </motion.h1>
        
             <motion.p 
               key={index + '-p'}
               initial={{ opacity: 0, y: 20, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
               className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10 text-white drop-shadow-md leading-relaxed px-2 animate-fade-in"
             >
               {content?.subtitle ?? 'Creating unforgettable experiences with elegance and precision. Let us bring your vision to life.'}
             </motion.p>
             
             <motion.div
               key={index + '-btn'}
               initial={{ opacity: 0, scale: 0.8, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
               className="group"
             >
               <Button asChild size="lg" className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500 animate-pulse">
                 <Link href="/services">Explore Our Services</Link>
               </Button>
             </motion.div>
      </div>

       {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button onClick={prevSlide} className="p-1 sm:p-2 m-1 sm:m-2 bg-motorcycle-card/50 backdrop-blur-sm border border-motorcycle-yellow/30 rounded-full hover:bg-motorcycle-yellow/20 hover:scale-110 transition-all duration-300 group">
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-motorcycle-yellow transition-colors duration-300" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button onClick={nextSlide} className="p-1 sm:p-2 m-1 sm:m-2 bg-motorcycle-card/50 backdrop-blur-sm border border-motorcycle-yellow/30 rounded-full hover:bg-motorcycle-yellow/20 hover:scale-110 transition-all duration-300 group">
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-motorcycle-yellow transition-colors duration-300" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${i === index ? 'bg-motorcycle-yellow shadow-lg shadow-motorcycle-yellow/50' : 'bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
}
