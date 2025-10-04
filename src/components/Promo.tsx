
'use client';
import { Button } from "@/components/ui/button";
import { Phone, Star, CalendarDays } from "lucide-react";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";
import type { PageContent } from "@/lib/page-content";

type PromoContent = PageContent['promo'];

export default function Promo({ content }: { content: PromoContent | undefined }) {

  if (!content) {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto text-center max-w-4xl animate-pulse">
                <div className="h-12 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-6 bg-muted rounded w-full mx-auto mb-10"></div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <div className="h-12 w-48 bg-muted rounded-md"></div>
                    <div className="h-12 w-36 bg-muted rounded-md"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center">
                    <div className="h-24 bg-muted rounded-md"></div>
                    <div className="h-24 bg-muted rounded-md"></div>
                    <div className="h-24 bg-muted rounded-md"></div>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-motorcycle-dark">
      <div className="container-professional text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-motorcycle-heading mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-fade-in"
            dangerouslySetInnerHTML={{ __html: content.title.replace(/Dream Event/g, '<span class="text-gradient">Dream Event</span>') }}
          />
           <p className="text-lg text-white mb-10 animate-fade-in">
             {content.paragraph}
           </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="btn-primary group hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-pulse">
            <Link href="/booking">
              <CalendarDays className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Schedule Consultation
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="btn-secondary group hover:scale-105 hover:bg-motorcycle-yellow hover:text-black transition-all duration-500">
            <Link href="tel:+1235550123">
              <Phone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Call Us Now
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-3 card-professional border border-motorcycle-yellow/30 group hover:scale-105 transition-all duration-500 rounded-3xl">
             <div className="text-5xl font-bold text-motorcycle-yellow flex justify-center items-center group-hover:animate-pulse">
                <AnimatedCounter to={content.stats.events} />+
              </div>
               <p className="text-white text-lg mt-2">Events Planned</p>
             </div>
             <div className="p-3 card-professional border border-motorcycle-yellow/30 group hover:scale-105 transition-all duration-500 rounded-3xl">
               <div className="text-4xl font-bold text-motorcycle-yellow flex justify-center items-center group-hover:animate-pulse">
                 <AnimatedCounter to={content.stats.satisfaction} />%
               </div>
               <p className="text-white text-lg mt-2">Client Satisfaction</p>
             </div>
             <div className="p-3 flex flex-col items-center card-professional border border-motorcycle-yellow/30 group hover:scale-105 transition-all duration-500 rounded-3xl">
               <div className="flex items-center text-4xl font-bold text-motorcycle-yellow group-hover:animate-pulse">
                   <AnimatedCounter to={content.stats.rating} />
                   <Star className="w-8 h-8 text-motorcycle-yellow fill-motorcycle-yellow group-hover:animate-spin" />
               </div>
               <p className="text-white text-lg mt-2">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
