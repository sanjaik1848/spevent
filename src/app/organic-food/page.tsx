'use client';

import TopNavbar from "@/components/TopNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Star, ArrowRight, Heart, Shield, Mail, Phone, User, MessageSquare } from "lucide-react";
import { menuData } from "@/lib/menu-data";
import { useState, useEffect } from "react";

export default function OrganicFoodPage() {
  const organicItems = menuData.organic;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <TopNavbar />
      <main className="min-h-screen relative">
        {/* High-Resolution Leaves with Dew Drops Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.wallpaperscraft.com/image/single/leaves_drops_dew_129757_3840x2160.jpg')`
          }}
        ></div>

        {/* Hero Section */}
        <section className="py-20 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full shadow-lg">
                  <Leaf className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
                <span className="text-green-300 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                  Organic Food Collection
                </span>
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Discover our premium selection of organic foods. Every item is carefully sourced from certified organic farms, ensuring the highest quality and nutritional value for your events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Feature Card 1 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">100% Certified Organic</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  All products are certified organic by recognized authorities
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Health & Wellness</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Nutrient-rich foods for a healthier lifestyle
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Our Organic Selection</h2>
              <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Carefully curated organic dishes that bring nature's goodness to your table
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {organicItems.map((item, index) => (
                <Card key={index} className="group overflow-hidden border-0 transition-all duration-500 hover:scale-105 h-full flex flex-col rounded-3xl">
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-t-3xl">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={item.imageHint}
                    />
                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-black border-0 shadow-lg backdrop-blur-sm text-xs px-2 py-1">
                        <Leaf className="w-2 h-2 md:w-3 md:h-3 mr-1 drop-shadow-sm" />
                        <span className="hidden sm:inline">Organic</span>
                        <span className="sm:hidden">Org</span>
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-3 md:p-6 flex flex-col flex-grow rounded-b-3xl bg-black/20 backdrop-blur-sm transition-all duration-300">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <h3 className="text-sm md:text-xl font-bold text-black group-hover:text-green-600 transition-colors duration-300 flex-1 pr-1 md:pr-2">
                        {item.name}
                      </h3>
                      <div className="flex flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current drop-shadow-sm" />
                        ))}
                      </div>
                    </div>
                    <p className="text-black leading-relaxed text-xs md:text-sm flex-grow font-medium">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
                Ready to Go Organic?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Transform your events with our premium organic food selection. 
                Contact us today to discuss your organic catering needs and create 
                unforgettable culinary experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700 border-0 rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/contact">
                    Get Quote
                    <ArrowRight className="w-5 h-5 ml-2 drop-shadow-sm" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <Link href="/food">
                    View Full Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Get Your Organic Quote</h2>
              <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Ready to bring organic excellence to your event? Let's discuss your needs.
              </p>
            </div>

            <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 border border-green-200/50 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white font-medium drop-shadow-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full h-12 rounded-2xl border-2 border-green-200/50 bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-green-500/70 placeholder:italic focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-lg hover:shadow-xl px-4"
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white font-medium drop-shadow-sm flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full h-12 rounded-2xl border-2 border-green-200/50 bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-green-500/70 placeholder:italic focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-lg hover:shadow-xl px-4"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-white font-medium drop-shadow-sm flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full h-12 rounded-2xl border-2 border-green-200/50 bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-green-500/70 placeholder:italic focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-lg hover:shadow-xl px-4"
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Event Type Field */}
                  <div className="space-y-2">
                    <label htmlFor="eventType" className="text-white font-medium drop-shadow-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Event Type
                    </label>
                    <input
                      id="eventType"
                      type="text"
                      placeholder="Wedding, Corporate, Birthday..."
                      className="w-full h-12 rounded-2xl border-2 border-green-200/50 bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-green-500/70 placeholder:italic focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-lg hover:shadow-xl px-4"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-white font-medium drop-shadow-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Tell Us About Your Event
                  </label>
                  <textarea
                    id="message"
                    placeholder="Describe your event details, guest count, dietary preferences, and any special requirements..."
                    rows={4}
                    className="w-full rounded-2xl border-2 border-green-200/50 bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-green-500/70 placeholder:italic focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 shadow-lg hover:shadow-xl resize-none p-4"
                    suppressHydrationWarning
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 rounded-2xl px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    suppressHydrationWarning
                  >
                    Get My Organic Quote
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">Why Choose Organic?</h2>
              <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Experience the difference that organic food brings to your events
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {/* Benefit 1 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-md">No Chemicals</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Free from harmful pesticides and synthetic fertilizers
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Better Nutrition</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Higher levels of vitamins, minerals, and antioxidants
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Certified Quality</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Rigorous certification standards ensure premium quality
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Pure Taste</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Authentic flavors that showcase nature's true essence
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Eco-Friendly</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Sustainable farming practices protect our environment
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="rounded-2xl p-4 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mr-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Health Benefits</h3>
                </div>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  Supports immune system and overall well-being
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}