import { Heart, Briefcase, Gift, Music } from "lucide-react";
import Link from 'next/link';
import { Button } from "./ui/button";

const services = [
  { 
    title: "Weddings", 
    description: "Create the perfect day with our luxury wedding planning services",
    icon: <Heart className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Corporate Events", 
    description: "Professional events that leave lasting impressions on your clients",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Birthday Parties", 
    description: "Celebrate life's special moments with unforgettable experiences",
    icon: <Gift className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Concerts & Shows", 
    description: "Stage spectacular performances with our expert event coordination",
    icon: <Music className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
];

export default function Services() {
         return (
           <section className="section-padding bg-white">
      <div className="container-professional">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Our Premium <span className="text-gradient">Services</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            From intimate gatherings to grand celebrations, we bring your vision to life with exceptional attention to detail and luxury service.
          </p>
        </div>
        
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {services.map((s, i) => (
                   <div key={i} className="card-professional p-8 text-center group">
                     <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-500">
                       {s.icon}
                     </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">{s.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{s.description}</p>
              <Link href="/services" className="inline-flex items-center font-semibold text-gradient hover:underline transition-all duration-300 group-hover:scale-105">
                Learn More
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg" className="btn-primary">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
