"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Camera, Calendar, Utensils, Heart, Star, Users, Clock, MapPin, Phone, X } from "lucide-react";
import { useWelcomeData } from "@/hooks/useWelcomeData";

const iconMap = {
  ChefHat,
  Camera,
  Calendar,
  Utensils,
  Heart,
  Star,
  Users,
  Clock,
  MapPin,
  Phone
};

export default function WelcomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds countdown
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { welcomeData } = useWelcomeData();
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-redirect timer
  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive]);

  // Handle redirect when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      router.push(welcomeData.primaryButtonLink);
    }
  }, [timeLeft, isTimerActive, router, welcomeData.primaryButtonLink]);

  const skipTimer = () => {
    setIsTimerActive(false);
    router.push(welcomeData.primaryButtonLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Auto-redirect Timer */}
      {isTimerActive && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Auto-redirect in
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{timeLeft}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTimer}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800">
                  {welcomeData.title}
                </h1>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gradient">
                {welcomeData.subtitle}
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              {welcomeData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={welcomeData.primaryButtonLink} className="w-full sm:w-auto">
                <Button size="lg" className="btn-primary w-full sm:w-auto">
                  {welcomeData.primaryButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href={welcomeData.secondaryButtonLink} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="btn-secondary w-full sm:w-auto">
                  <Utensils className="mr-2 w-5 h-5" />
                  {welcomeData.secondaryButtonText}
                </Button>
              </Link>
            </div>

            {/* Auto-redirect notification */}
            {isTimerActive && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      You'll be automatically redirected to our website in {timeLeft} seconds
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Click "Enter Website" now or wait for automatic redirect
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {welcomeData.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || ChefHat;
                return (
                  <div key={index} className="text-center space-y-3 group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 text-gradient" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{feature.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-professional-lg">
                <Image
                  src={welcomeData.heroImage}
                  alt={welcomeData.heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              {welcomeData.floatingCards.map((card, index) => {
                const IconComponent = iconMap[card.icon as keyof typeof iconMap] || ChefHat;
                const positionClass = card.position === 'top-left' ? '-top-6 -left-6' : '-bottom-6 -right-6';
                
                return (
                  <div key={index} className={`absolute ${positionClass} card-elevated p-6 max-w-xs`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-gradient" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{card.title}</p>
                        <p className="text-sm text-gray-600">{card.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
