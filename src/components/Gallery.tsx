'use client';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';

const galleryCategories = [
    {id: 'weddings', name: "Weddings", placeholderId: "wedding-1", description: "Luxury wedding celebrations"},
    {id: 'corporate', name: "Corporate Events", placeholderId: "corporate-1", description: "Professional business events"},
    {id: 'parties', name: "Private Parties", placeholderId: "party-1", description: "Personal celebrations"},
    {id: 'concerts', name: "Entertainment", placeholderId: "concert-1", description: "Live performances & shows"},
];

export default function Gallery() {
  return (
    <section className="section-padding bg-motorcycle-dark">
      <div className="container-professional">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h2 
            whileHover={{ scale: 1.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-motorcycle-white mb-6"
          >
            Our Event <span className="text-gradient">Portfolio</span>
          </motion.h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-motorcycle-white/80 leading-relaxed mb-8">
            Explore our diverse portfolio of extraordinary events. Each category showcases our expertise in creating unforgettable experiences.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-16"
        >
          {galleryCategories.map((cat, index) => {
            const image = placeholderImages.find(p => p.id === cat.placeholderId);
            if (!image) return null;
            
            return (
              <motion.div
                key={cat.id}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/gallery/${cat.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl shadow-professional hover:shadow-professional-lg transition-all duration-500 bg-motorcycle-card card-professional border border-motorcycle-yellow hover:border-motorcycle-yellow/80">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                      >
                        <Image 
                            src={image.imageUrl} 
                            alt={image.description}
                            fill
                            className="object-cover object-center"
                            data-ai-hint={image.imageHint}
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="text-center"
                        >
                          <h3 className="text-white text-2xl sm:text-3xl font-bold font-serif mb-2">
                            {cat.name}
                          </h3>
                          <p className="text-white/90 text-sm mb-4 max-w-xs">
                            {cat.description}
                          </p>
                          <motion.div 
                            initial={{ width: 0 }}
                            whileHover={{ width: 64 }}
                            className="h-1 bg-gradient-to-r from-motorcycle-yellow to-orange-400 mx-auto rounded-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Content Info */}
                    <div className="p-3 md:p-6">
                      <h3 className="text-sm md:text-xl font-serif font-semibold text-motorcycle-white mb-1 md:mb-2 group-hover:text-gradient transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="text-motorcycle-white/70 text-xs md:text-sm mb-2 md:mb-4">
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-motorcycle-white/60 group-hover:text-motorcycle-yellow transition-colors duration-300">View Gallery</span>
                        <motion.div 
                          whileHover={{ scale: 1.5, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-2 h-2 bg-gradient-to-r from-motorcycle-yellow to-orange-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="btn-primary shadow-lg hover:shadow-2xl transition-all duration-300">
              <Link href="/gallery">Explore Full Portfolio</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
