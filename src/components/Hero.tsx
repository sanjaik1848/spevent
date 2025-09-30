
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
    <section className="relative h-screen overflow-hidden text-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={currentImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

           <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
             <motion.h1 
               key={index + '-h1'}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg"
             >
               {content?.title ?? 'Elite Event Management'}
             </motion.h1>
        
             <motion.p 
               key={index + '-p'}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto mb-10 text-white/90 drop-shadow-md leading-relaxed"
             >
               {content?.subtitle ?? 'Creating unforgettable experiences with elegance and precision. Let us bring your vision to life.'}
             </motion.p>
             
             <motion.div
               key={index + '-btn'}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: 0.6 }}
             >
               <Button asChild size="lg" className="btn-primary text-lg px-10 py-5">
                 <Link href="/services">Explore Our Services</Link>
               </Button>
             </motion.div>
      </div>

       {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button onClick={prevSlide} className="p-2 m-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button onClick={nextSlide} className="p-2 m-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
