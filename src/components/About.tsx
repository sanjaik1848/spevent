
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { placeholderImages } from "@/lib/placeholder-images";
import type { PageContent } from "@/lib/page-content";

type AboutContent = PageContent['about'];

export default function About({ content }: { content: AboutContent | undefined }) {
  const aboutImage = placeholderImages.find(p => p.id === "about-1");

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto">
         <Card className="overflow-hidden shadow-2xl border-none">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                   <CardHeader>
                        <CardTitle className="text-3xl font-serif text-primary">What Sets Us Apart</CardTitle>
                   </CardHeader>
                   <CardContent>
                        <p className="text-lg text-muted-foreground mb-6">
                            {content?.paragraph}
                        </p>
                        <blockquote className="border-l-4 border-primary pl-4 italic text-foreground mb-8">
                            "{content?.quote}"
                        </blockquote>
                        <Button asChild>
                            <Link href="/about">Learn More About Us</Link>
                        </Button>
                   </CardContent>
                </div>
                <div className="relative w-full h-64 md:h-full min-h-[300px]">
                    {aboutImage && (
                        <Image 
                            src={aboutImage.imageUrl} 
                            alt={aboutImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={aboutImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
}
