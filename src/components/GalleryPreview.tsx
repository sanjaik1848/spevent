
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const galleryImages = [
    { id: 'wedding-1', src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Luxury Wedding Reception", hint: "luxury wedding reception", title: "Weddings", className: "col-span-1 row-span-1", link: "/gallery/weddings" },
    { id: 'corporate-1', src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", alt: "Professional Conference", hint: "corporate conference", title: "Corporate Events", className: "col-span-1 row-span-2", link: "/gallery/corporate" },
    { id: 'party-1', src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Luxury Birthday Celebration", hint: "birthday party", title: "Private Parties", className: "col-span-1 row-span-1", link: "/gallery/parties" },
    { id: 'gala-1', src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", alt: "Charity Gala Dinner", hint: "gala dinner", title: "Galas & Fundraisers", className: "col-span-1 row-span-1", link: "/gallery/galas" },
    { id: 'concert-1', src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", alt: "Live Music Concert", hint: "live concert", title: "Entertainment", className: "col-span-1 row-span-1", link: "/gallery/entertainment" },
];

export default function GalleryPreview() {
         return (
           <section className="section-padding bg-motorcycle-dark">
      <div className="container-professional">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-motorcycle-heading font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-6">
            Our Event <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-white leading-relaxed">
            Discover the extraordinary events we've orchestrated. Each celebration tells a unique story of elegance, precision, and unforgettable moments.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 h-[500px] mb-16">
          {galleryImages.map((img) => (
            <Link key={img.id} href={img.link} className={`relative rounded-3xl overflow-hidden shadow-professional group ${img.className}`}>
              <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  data-ai-hint={img.hint}
              />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                       <div className="text-center">
                         <h3 className="text-white text-2xl sm:text-3xl font-bold font-motorcycle-heading mb-2">
                             {img.title}
                         </h3>
                         <div className="w-16 h-1 bg-gradient-to-r from-motorcycle-yellow to-yellow-400 mx-auto rounded-full"></div>
                       </div>
                      </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="btn-primary text-lg px-10 py-5">
            <Link href="/gallery">Visit Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
