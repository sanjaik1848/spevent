import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopNavbar from "@/components/TopNavbar";
import { defaultContent } from "@/lib/page-content";

const services = [
  {
    title: "Luxury Wedding Planning",
    description: "Your wedding day is one of the most important moments of your life. We are dedicated to creating a flawless, beautiful, and memorable celebration that reflects your personal style. From venue selection to vendor coordination, we handle every detail with precision and care, allowing you to savor every moment of your special day.",
    features: [
      "Full-service planning & coordination",
      "Venue sourcing & management",
      "Custom theme & design development",
      "Vendor selection & negotiation",
      "On-site management & day-of execution"
    ],
    imageUrl: "https://images.unsplash.com/photo-1597984819711-53644f198d5c?w=800&q=80",
    imageHint: "luxury wedding setup"
  },
  {
    title: "Corporate Event Management",
    description: "From large-scale conferences to intimate executive retreats, we deliver professional and impactful corporate events. Our team understands the importance of brand messaging and audience engagement. We work behind the scenes to ensure your event runs smoothly, on-brand, and achieves your business objectives.",
    features: [
      "Conferences, seminars, and product launches",
      "Team-building activities & retreats",
      "Gala dinners & award ceremonies",
      "Audio-visual & technical production",
      "Attendee registration & management"
    ],
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    imageHint: "corporate meeting room"
  },
  {
    title: "Bespoke Parties & Celebrations",
    description: "Mark your milestones with a celebration that stands out. Whether it's a landmark birthday, an anniversary, or a themed party, we bring creativity and excitement to your event. We manage all aspects of party planning, so you can focus on making memories with your guests.",
    features: [
      "Birthday parties & anniversaries",
      "Themed celebrations & private dinners",
      "Entertainment & talent booking",
      "Custom catering & menu design",
      "Decor, lighting, and ambiance"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504196696113-d3b544a49704?w=800&q=80",
    imageHint: "elegant party table"
  },
  {
    title: "Concerts & Live Shows",
    description: "We provide comprehensive management for concerts and live performances of all sizes. From securing the right venue to managing logistics and technical production, our expertise ensures a spectacular and seamless show for both artists and audiences.",
    features: [
      "Venue booking & logistics",
      "Stage design & technical production",
      "Artist and crew coordination",
      "Ticketing & audience management",
      "Security & safety planning"
    ],
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    imageHint: "concert crowd lights"
  }
];

export default async function ServicesPage() {
    const content = defaultContent;
    
    return (
        <>
        <TopNavbar />
        <main className="py-12 bg-background">
            <div className="container">

                <section className="mb-16">
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="https://picsum.photos/seed/services-hero/1200/400"
                            alt="A vibrant event setup"
                            fill
                            className="object-cover"
                            data-ai-hint="event planning"
                        />
                    </div>
                </section>
                
                <section className="text-center py-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">{content.services.title}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                        {content.services.paragraph}
                    </p>
                </section>

                <div className="space-y-20">
                    {services.map((service, index) => (
                        <section key={service.title} className="grid md:grid-cols-2 gap-12 items-center">
                            <div className={`relative w-full h-96 rounded-lg overflow-hidden shadow-xl ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <Image
                                    src={service.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={service.imageHint}
                                />
                            </div>
                            <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">{service.title}</h2>
                                <p className="text-muted-foreground mb-6">{service.description}</p>
                                <h3 className="font-semibold text-foreground mb-4">What's Included:</h3>
                                <ul className="space-y-3">
                                    {service.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                </div>

                <section className="text-center py-20 mt-16 bg-secondary rounded-lg">
                    <h2 className="text-3xl font-bold font-serif text-foreground mb-4">Ready to Create Your Unforgettable Event?</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                        Let's discuss your vision. Contact us today to schedule a complimentary consultation with one of our expert planners.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/booking">Book a Consultation</Link>
                    </Button>
                </section>
            </div>
        </main>
        </>
    );
}
