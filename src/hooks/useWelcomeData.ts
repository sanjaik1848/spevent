import { useState, useEffect } from 'react';
import { defaultWelcomeData, WelcomePageData } from '@/lib/welcome-data';

export function useWelcomeData() {
  const [welcomeData, setWelcomeData] = useState<WelcomePageData>(defaultWelcomeData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedData = localStorage.getItem('welcomeData');
      if (storedData) {
        setWelcomeData(JSON.parse(storedData));
      } else {
        setWelcomeData(defaultWelcomeData);
      }
    } catch (error) {
      console.error("Failed to load welcome data from localStorage, using default data.", error);
      setWelcomeData(defaultWelcomeData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('welcomeData', JSON.stringify(welcomeData));
    }
  }, [welcomeData, isLoading]);

  const updateWelcomeData = (updatedData: Partial<WelcomePageData>) => {
    setWelcomeData(prev => ({ ...prev, ...updatedData }));
  };

  const updateFeature = (index: number, updatedFeature: Partial<WelcomePageData['features'][0]>) => {
    setWelcomeData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, ...updatedFeature } : feature
      )
    }));
  };

  const updateFloatingCard = (index: number, updatedCard: Partial<WelcomePageData['floatingCards'][0]>) => {
    setWelcomeData(prev => ({
      ...prev,
      floatingCards: prev.floatingCards.map((card, i) => 
        i === index ? { ...card, ...updatedCard } : card
      )
    }));
  };

  const resetToDefault = () => {
    setWelcomeData(defaultWelcomeData);
  };

  return { 
    welcomeData, 
    isLoading, 
    updateWelcomeData, 
    updateFeature, 
    updateFloatingCard, 
    resetToDefault 
  };
}
