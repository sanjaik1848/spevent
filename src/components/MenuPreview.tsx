import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ServicesPreview() {
  return (
    <section id="services-preview" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto">
         <Card className="overflow-hidden shadow-2xl border-none">
            <div className="grid md:grid-cols-2 items-center">
                <div className="relative w-full h-64 md:h-full min-h-[400px]">
                    <Image 
                        src="https://picsum.photos/seed/service-preview/800/600"
                        alt="Preview of event services"
                        fill
                        className="object-cover"
                        data-ai-hint="event planning services"
                    />
                </div>
                <div className="p-8 md:p-12">
                   <CardHeader>
                        <CardTitle className="text-3xl font-serif text-primary">Comprehensive Event Solutions</CardTitle>
                   </CardHeader>
                   <CardContent>
                        <p className="text-lg text-muted-foreground mb-6">
                            From elegant weddings to professional corporate gatherings, we provide a full spectrum of services to make your event seamless and memorable. Our expert team handles every detail with precision and care.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/services">Discover Our Services</Link>
                        </Button>
                   </CardContent>
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
}
