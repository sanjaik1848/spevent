'use client';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';

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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-motorcycle-white mb-6">
            Our Event <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-motorcycle-white/80 leading-relaxed mb-8">
            Explore our diverse portfolio of extraordinary events. Each category showcases our expertise in creating unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-16">
          {galleryCategories.map((cat) => {
            const image = placeholderImages.find(p => p.id === cat.placeholderId);
            if (!image) return null;
            
            return (
              <Link key={cat.id} href={`/gallery/${cat.id}`} className="group">
                <div className="relative overflow-hidden rounded-3xl shadow-professional hover:shadow-professional-lg transition-all duration-500 bg-motorcycle-card card-professional border border-motorcycle-yellow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                        src={image.imageUrl} 
                        alt={image.description}
                        fill
                        className="object-cover object-center transform group-hover:scale-110 transition-all duration-500"
                        data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                      <div className="text-center">
                        <h3 className="text-white text-2xl sm:text-3xl font-bold font-serif mb-2">
                          {cat.name}
                        </h3>
                        <p className="text-white/90 text-sm mb-4 max-w-xs">
                          {cat.description}
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-motorcycle-yellow to-orange-400 mx-auto rounded-full"></div>
                      </div>
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
                      <span className="text-xs md:text-sm text-motorcycle-white/60">View Gallery</span>
                      <div className="w-2 h-2 bg-gradient-to-r from-motorcycle-yellow to-orange-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="btn-primary">
            <Link href="/gallery">Explore Full Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
