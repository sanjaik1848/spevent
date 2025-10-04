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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-motorcycle-dark">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-2xl animate-bounce delay-3000"></div>
        
        {/* Moving particles */}
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1500"></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Auto-redirect Timer */}
      {isTimerActive && (
        <div className="fixed top-2 right-2 sm:top-6 sm:right-6 z-50 max-w-xs">
          <div className="backdrop-blur-sm shadow-lg border p-2 sm:p-4 bg-motorcycle-card border-motorcycle-yellow card-professional group hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-motorcycle-yellow group-hover:animate-spin" />
                <span className="text-xs sm:text-sm font-medium text-motorcycle-white">
                  <span className="hidden sm:inline">Auto-redirect in</span>
                  <span className="sm:hidden">Redirect in</span>
                </span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-motorcycle-accent group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-xs sm:text-sm animate-pulse">{timeLeft}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTimer}
                className="text-gray-500 hover:text-gray-700 p-1 hover:scale-110 transition-transform duration-300"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
            <div className="mt-1 sm:mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container-professional max-w-6xl mx-auto w-full relative z-10 pt-16 sm:pt-20">
        {/* Title Above Image */}
        <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 card-professional group hover:scale-110 hover:rotate-12 transition-all duration-500 animate-pulse">
                <ChefHat className="w-7 h-7 text-black group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-motorcycle-heading font-bold text-motorcycle-white animate-fade-in">
                {welcomeData.title}
              </h1>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-motorcycle-heading font-bold text-gradient animate-pulse">
              {welcomeData.subtitle}
            </h2>
          </div>
        </div>

        {/* Image Below Title */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative w-full">
            {/* Main Image */}
            <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-3xl overflow-hidden shadow-professional-lg card-professional group hover:scale-105 hover:rotate-1 transition-all duration-700">
              {/* Animated border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-[2px] bg-motorcycle-dark rounded-3xl"></div>
              
              <Image
                src={welcomeData.heroImage}
                alt={welcomeData.heroImageAlt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                priority
              />
              
              {/* Enhanced overlay with animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
              
              {/* Floating elements on hover */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-300"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-500"></div>
              <div className="absolute top-1/2 left-4 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-700"></div>
            </div>
          </div>
        </div>

        {/* Content Below Image */}
        <div className={`space-y-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto text-center text-motorcycle-white/90 animate-fade-in">
            {welcomeData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={welcomeData.primaryButtonLink} className="w-full sm:w-auto group">
              <Button size="lg" className="btn-primary w-full sm:w-auto group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500 animate-pulse">
                {welcomeData.primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Link href={welcomeData.secondaryButtonLink} className="w-full sm:w-auto group">
              <Button variant="outline" size="lg" className="btn-secondary w-full sm:w-auto group-hover:scale-105 group-hover:bg-motorcycle-yellow group-hover:text-black transition-all duration-500">
                <Utensils className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                {welcomeData.secondaryButtonText}
              </Button>
            </Link>
          </div>

          {/* Auto-redirect notification */}
          {isTimerActive && (
            <div className="rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 max-w-2xl mx-auto bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 backdrop-blur-sm animate-pulse">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-yellow-400 animate-spin" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-motorcycle-white">
                    <span className="hidden sm:inline">You'll be automatically redirected to our website in {timeLeft} seconds</span>
                    <span className="sm:hidden">Auto-redirect in {timeLeft}s</span>
                  </p>
                  <p className="text-xs mt-1 hidden sm:block text-yellow-400">
                    Click "Enter Website" now or wait for automatic redirect
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Icons */}
          <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
            {welcomeData.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || ChefHat;
              return (
                <div key={index} className="text-center space-y-3 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-motorcycle-card to-motorcycle-dark border border-motorcycle-yellow rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 card-professional relative overflow-hidden">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <IconComponent className="w-8 h-8 text-gradient group-hover:scale-110 group-hover:animate-bounce transition-all duration-300 relative z-10" />
                  </div>
                  <p className="text-sm font-semibold text-motorcycle-white group-hover:text-gradient transition-colors duration-300 animate-fade-in">{feature.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
