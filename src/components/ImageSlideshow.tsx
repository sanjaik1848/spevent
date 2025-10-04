"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slideshowImages as defaultSlideshowImages } from "@/lib/slideshow-images";

type SlideshowImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export default function ImageSlideshow() {
  const [slideshowImages, setSlideshowImages] = useState<SlideshowImage[]>(defaultSlideshowImages);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideshowImages.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const nextSlide = () => {
    if (slideshowImages.length === 0) return;
    setIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    if (slideshowImages.length === 0) return;
    setIndex((prevIndex) => (prevIndex - 1 + slideshowImages.length) % slideshowImages.length);
  };
  
  if (slideshowImages.length === 0) {
    return null;
  }

  const currentImage = slideshowImages[index];

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
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
        </motion.div>
      </AnimatePresence>

       {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10">
        <button onClick={prevSlide} className="p-2 m-4 bg-motorcycle-card/50 backdrop-blur-sm border border-motorcycle-yellow/30 rounded-full text-white hover:bg-motorcycle-yellow/20 hover:scale-110 transition-all duration-300 group">
          <ChevronLeft className="w-8 h-8 group-hover:text-motorcycle-yellow transition-colors duration-300" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-10">
        <button onClick={nextSlide} className="p-2 m-4 bg-motorcycle-card/50 backdrop-blur-sm border border-motorcycle-yellow/30 rounded-full text-white hover:bg-motorcycle-yellow/20 hover:scale-110 transition-all duration-300 group">
          <ChevronRight className="w-8 h-8 group-hover:text-motorcycle-yellow transition-colors duration-300" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slideshowImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${i === index ? 'bg-motorcycle-yellow shadow-lg shadow-motorcycle-yellow/50' : 'bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
}