import { Heart, Briefcase, Gift, Music, Users, Camera, Utensils, Sparkles } from "lucide-react";
import Link from 'next/link';
import { Button } from "./ui/button";

const services = [
  { 
    title: "Weddings", 
    description: "Create the perfect day with our luxury wedding planning services. From intimate ceremonies to grand celebrations, we make your dream wedding come true.",
    icon: <Heart className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Corporate Events", 
    description: "Professional events that leave lasting impressions on your clients. Conferences, seminars, product launches, and team building events.",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Birthday Parties", 
    description: "Celebrate life's special moments with unforgettable experiences. Custom themes, entertainment, and personalized touches for all ages.",
    icon: <Gift className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Concerts & Shows", 
    description: "Stage spectacular performances with our expert event coordination. Music concerts, cultural shows, and entertainment events.",
    icon: <Music className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Anniversary Celebrations", 
    description: "Mark your milestones with elegant anniversary celebrations. From intimate dinners to grand parties, we create memorable moments.",
    icon: <Users className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Photo & Video", 
    description: "Professional photography and videography services to capture your special moments. High-quality documentation of your events.",
    icon: <Camera className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Catering Services", 
    description: "Exquisite culinary experiences with our professional catering team. Custom menus, dietary accommodations, and exceptional service.",
    icon: <Utensils className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
  { 
    title: "Event Decorations", 
    description: "Transform any space with our creative decoration services. Themed designs, floral arrangements, and stunning visual displays.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    bgColor: "bg-primary/10",
  },
];

export default function Services() {
         return (
           <section className="section-padding bg-motorcycle-dark">
      <div className="container-professional">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-motorcycle-heading font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Our Premium <span className="text-gradient">Services</span>
          </h2>
          <p className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed px-2">
            From intimate gatherings to grand celebrations, we bring your vision to life with exceptional attention to detail and luxury service.
          </p>
        </div>
        
               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                 {services.map((s, i) => (
                   <div key={i} className="card-professional p-3 sm:p-6 lg:p-8 text-center group rounded-3xl">
                     <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-all duration-500">
                       <div className="w-5 h-5 sm:w-6 sm:h-6 text-motorcycle-yellow">
                         {s.icon}
                       </div>
                     </div>
              <h3 className="text-sm sm:text-xl font-motorcycle-heading font-bold text-white mb-2 sm:mb-4">{s.title}</h3>
              <p className="text-xs sm:text-base text-white mb-3 sm:mb-6 leading-relaxed">{s.description}</p>
              <Link href="/services" className="inline-flex items-center font-semibold text-gradient hover:underline transition-all duration-300 group-hover:scale-105 text-sm sm:text-base">
                Learn More
                <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <Button asChild size="lg" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
