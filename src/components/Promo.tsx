
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="h-24 bg-muted rounded-md"></div>
                    <div className="h-24 bg-muted rounded-md"></div>
                    <div className="h-24 bg-muted rounded-md"></div>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-foreground"
          dangerouslySetInnerHTML={{ __html: content.title.replace(/Dream Event/g, '<span class="text-primary">Dream Event</span>') }}
        />
        <p className="text-lg text-muted-foreground mb-10">
          {content.paragraph}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="hover:scale-105 hover:shadow-lg transition-transform">
            <Link href="/booking">
              <CalendarDays className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="hover:scale-105 transition-transform">
            <Link href="tel:+1235550123">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
             <div className="text-5xl font-bold text-primary flex justify-center items-center">
                <AnimatedCounter to={content.stats.events} />+
              </div>
            <p className="text-muted-foreground text-lg mt-2">Events Planned</p>
          </div>
          <div className="p-4">
            <div className="text-5xl font-bold text-primary flex justify-center items-center">
              <AnimatedCounter to={content.stats.satisfaction} />%
            </div>
            <p className="text-muted-foreground text-lg mt-2">Client Satisfaction</p>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="flex items-center text-5xl font-bold text-primary">
                <AnimatedCounter to={content.stats.rating} />
                <Star className="w-10 h-10 text-primary fill-primary" />
            </div>
            <p className="text-muted-foreground text-lg mt-2">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
