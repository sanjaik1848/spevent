"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopNavbar from "@/components/TopNavbar";
import { defaultContent } from "@/lib/page-content";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "@/lib/animations";

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

export default function ServicesPage() {
    const content = defaultContent;
    
    return (
        <>
        <TopNavbar />
        <main className="py-12 bg-motorcycle-dark min-h-screen">
            <div className="container-professional">

                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="mb-16"
                >
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-professional-lg card-professional border border-motorcycle-yellow group">
                        <Image
                            src="https://picsum.photos/seed/services-hero/1200/400"
                            alt="A vibrant event setup"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            data-ai-hint="event planning"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center z-10">
                                <h1 className="text-4xl md:text-6xl font-bold font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4">
                                    Our Premium Services
                                </h1>
                                <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
                                    Creating unforgettable experiences with elegance and precision
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>
                
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    className="text-center py-16"
                >
                    <motion.h2 
                        variants={staggerItem}
                        whileHover={{ scale: 1.05 }}
                        className="text-3xl md:text-4xl font-bold font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4"
                    >
                        {content.services.title}
                    </motion.h2>
                    <motion.p 
                        variants={staggerItem}
                        className="max-w-3xl mx-auto text-lg text-motorcycle-white/90"
                    >
                        {content.services.paragraph}
                    </motion.p>
                </motion.section>

                <div className="space-y-20">
                    {services.map((service, index) => (
                        <motion.section 
                            key={service.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 gap-12 items-center"
                        >
                            <motion.div 
                                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                                className={`relative w-full h-96 rounded-3xl overflow-hidden shadow-professional-lg card-professional border border-motorcycle-yellow group ${index % 2 === 1 ? 'md:order-2' : ''}`}
                            >
                                <Image
                                    src={service.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                                    data-ai-hint={service.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                            <motion.div 
                                variants={index % 2 === 0 ? fadeInRight : fadeInLeft}
                                className={`${index % 2 === 1 ? 'md:order-1' : ''}`}
                            >
                                <motion.h3 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-3xl font-serif font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4"
                                >
                                    {service.title}
                                </motion.h3>
                                <p className="text-motorcycle-white/90 mb-6 leading-relaxed">{service.description}</p>
                                <h4 className="font-semibold text-motorcycle-yellow mb-4 text-lg">What's Included:</h4>
                                <motion.ul 
                                    variants={staggerContainer}
                                    className="space-y-3"
                                >
                                    {service.features.map((feature, i) => (
                                        <motion.li 
                                            key={feature}
                                            variants={staggerItem}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-3 group/item cursor-pointer"
                                        >
                                            <CheckCircle className="w-5 h-5 text-motorcycle-yellow flex-shrink-0 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
                                            <span className="text-motorcycle-white/90 group-hover/item:text-motorcycle-yellow transition-colors duration-300">{feature}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </motion.section>
                    ))}
                </div>

                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center py-20 mt-16 bg-motorcycle-card rounded-3xl relative overflow-hidden group card-professional border border-motorcycle-yellow shadow-professional-lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,211,45,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                    </div>
                    <div className="relative z-10">
                        <motion.h2 
                            whileHover={{ scale: 1.05 }}
                            className="text-3xl md:text-4xl font-bold font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4"
                        >
                            Ready to Create Your Unforgettable Event?
                        </motion.h2>
                        <p className="max-w-2xl mx-auto text-motorcycle-white/90 mb-8 text-lg">
                            Let's discuss your vision. Contact us today to schedule a complimentary consultation with one of our expert planners.
                        </p>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild size="lg" className="btn-primary shadow-lg hover:shadow-2xl transition-all duration-300">
                                <Link href="/booking">Book a Consultation</Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </main>
        </>
    );
}
